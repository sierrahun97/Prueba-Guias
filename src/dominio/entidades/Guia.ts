import EstadoGuia from "../enums/EstadoGuia";

class Guia {
  private numeroGuia: string;
  private cliente: string;
  private valorDeclarado: number;
  private estado: EstadoGuia;
  private fechaCreacion: Date;

  constructor(
    numeroGuia: string,
    cliente: string,
    valorDeclarado: number,
    estado: EstadoGuia = EstadoGuia.CREADA,
    fechaCreacion: Date = new Date()
  ) {
    this.numeroGuia = numeroGuia;
    this.cliente = cliente;
    this.valorDeclarado = valorDeclarado;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
  }

  getNumeroGuia(): string {
    return this.numeroGuia;
  }

  getCliente(): string {
    return this.cliente;
  }

  getValorDeclarado(): number {
    return this.valorDeclarado;
  }

  getEstado(): EstadoGuia {
    return this.estado;
  }

  getFechaCreacion(): Date {
    return this.fechaCreacion;
  }


  facturarGuia(): void {
    if (this.estado !== EstadoGuia.CREADA) {
      throw new Error(`No se puede facturar una guía en estado ${this.estado}`);
    }
    this.estado = EstadoGuia.FACTURADA;
  }


  anularGuia(): void {
    if (this.estado === EstadoGuia.FACTURADA) {
      throw new Error('No se puede anular una guía facturada');
    }
    this.estado = EstadoGuia.ANULADA;
  }

  toJSON() {
    return {
      numeroGuia: this.numeroGuia,
      cliente: this.cliente,
      valorDeclarado: this.valorDeclarado,
      estado: this.estado,
      fechaCreacion: this.fechaCreacion
    };
  }
}

export default Guia;