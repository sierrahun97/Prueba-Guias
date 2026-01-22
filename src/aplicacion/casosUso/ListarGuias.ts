import Guia from "../../dominio/entidades/Guia.js";
import type { IGuiaRepositorio } from "../../dominio/repositorio/IGuiaRepositorio.js";

class ListarGuias {
  constructor(private readonly repositorio: IGuiaRepositorio) {}

    async execute(): Promise<Guia[]> {
        return this.repositorio.listarGuias();
    }
}

export default ListarGuias;
