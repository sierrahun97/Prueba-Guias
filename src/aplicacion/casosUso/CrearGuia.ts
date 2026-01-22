import Guia from "../../dominio/entidades/Guia";
import type { IGuiaRepositorio } from "../../dominio/repositorio/IGuiaRepositorio";
import EstadoGuia from "../../dominio/enums/EstadoGuia";

export class CrearGuia {
  constructor(private readonly repositorio: IGuiaRepositorio) {}

  async execute(
    numeroGuia: string,
    cliente: string,
    valorDeclarado: number,
  ): Promise<Guia> {
    //Validación 1: Guia ya existente
    const guiaExistente = await this.repositorio.obtenerGuiaPorNumero(numeroGuia);
    if (guiaExistente) {
      throw new Error(`Ya existe una guía con el número ${numeroGuia}`);
    }

    //Validación 2: los datos deben ser válidos
    if (!numeroGuia || !cliente || valorDeclarado <= 0) {
      throw new Error(
        "Número de guía, cliente y valor declarado son requeridos",
      );
    }

    const guia = new Guia(
      numeroGuia,
      cliente,
      valorDeclarado,
      EstadoGuia.CREADA,
      new Date(),
    );

    await this.repositorio.crearGuia(guia);
    return guia;

  }
}

export default CrearGuia;
