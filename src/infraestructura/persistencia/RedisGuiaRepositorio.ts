import type { RedisClientType } from 'redis';
import Guia from '../../dominio/entidades/Guia';
import type { IGuiaRepositorio } from '../../dominio/repositorio/IGuiaRepositorio';

class RedisGuiaRepositorio implements IGuiaRepositorio {
  private redis: RedisClientType;
  private readonly prefijo = 'guia:'; 

  constructor(redis: RedisClientType) {
    this.redis = redis;
  }

  async save(guia: Guia): Promise<Guia> {
    const clave = `${this.prefijo}${guia.getNumeroGuia()}`;
    const datos = JSON.stringify(guia.toJSON());
    
    await this.redis.set(clave, datos);
    return guia;
  }

  async findByNumero(numeroGuia: string): Promise<Guia | null> {
    const clave = `${this.prefijo}${numeroGuia}`;
    const datos = await this.redis.get(clave);

    if (!datos) {
      return null;
    }

    return this.reconstruirGuia(JSON.parse(datos));
  }


  async listarGuias(): Promise<Guia[]> {
    const patron = `${this.prefijo}*`;
    const claves = await this.redis.keys(patron);

    const guias: Guia[] = [];

    for (const clave of claves) {
      const datos = await this.redis.get(clave);
      if (datos) {
        guias.push(this.reconstruirGuia(JSON.parse(datos)));
      }
    }

    return guias;
  }

  async update(guia: Guia): Promise<Guia> {
    const clave = `${this.prefijo}${guia.getNumeroGuia()}`;
    const existe = await this.redis.exists(clave);

    if (existe === 0) {
      throw new Error(`Guía ${guia.getNumeroGuia()} no encontrada`);
    }

    const datos = JSON.stringify(guia.toJSON());
    await this.redis.set(clave, datos);
    return guia;
  }


  async existeNumero(numeroGuia: string): Promise<boolean> {
    const clave = `${this.prefijo}${numeroGuia}`;
    const existe = await this.redis.exists(clave);
    return existe === 1;
  }


  async crearGuia(guia: Guia): Promise<Guia> {
    return this.save(guia);
  }


  async obtenerGuiaPorNumero(numeroGuia: string): Promise<Guia | null> {
    return this.findByNumero(numeroGuia);
  }


  async actualizarGuia(guia: Guia): Promise<Guia> {
    return this.update(guia);
  }


  private reconstruirGuia(datos: any): Guia {
    return new Guia(
      datos.numeroGuia,
      datos.cliente,
      datos.valorDeclarado,
      datos.estado,
      new Date(datos.fechaCreacion)
    );
  }
}

export default RedisGuiaRepositorio;