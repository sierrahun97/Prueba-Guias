import Guia from "../entidades/Guia";

export interface IGuiaRepositorio {
    crearGuia(guia: Guia): Promise<Guia>;
    listarGuias(): Promise<Guia[]>;
    obtenerGuiaPorNumero(numeroGuia: string): Promise<Guia | null>;
    actualizarGuia(guia: Guia): Promise<Guia>;
    existeNumero(numeroGuia: string): Promise<boolean>;
}