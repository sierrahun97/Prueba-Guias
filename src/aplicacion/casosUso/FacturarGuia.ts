import Guia from "../../dominio/entidades/Guia";
import type { IGuiaRepositorio } from "../../dominio/repositorio/IGuiaRepositorio";

class FacturarGuia {
    constructor(private readonly repositorio: IGuiaRepositorio) {}

    async execute (numeroGuia: string): Promise<Guia> {
        const guia = await this.repositorio.obtenerGuiaPorNumero(numeroGuia);
        if (!guia) {
            throw new Error(`No se encontró la guía ${numeroGuia}`);
        }

        guia.facturarGuia();
        await this.repositorio.actualizarGuia(guia);
        return guia;
    }
}

export default FacturarGuia;