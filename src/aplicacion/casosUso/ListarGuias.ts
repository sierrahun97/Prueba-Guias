import Guia from "../../dominio/entidades/Guia";
import type { IGuiaRepositorio } from "../../dominio/repositorio/IGuiaRepositorio";

class ListarGuias {
  constructor(private readonly repositorio: IGuiaRepositorio) {}

    async execute(): Promise<Guia[]> {
        return this.repositorio.listarGuias();
    }
}

export default ListarGuias;
