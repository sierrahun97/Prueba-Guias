import type { FastifyRequest, FastifyReply } from "fastify";
import CrearGuia from "../../aplicacion/casosUso/CrearGuia";
import ListarGuias from "../../aplicacion/casosUso/ListarGuias";
import AnularGuia from "../../aplicacion/casosUso/AnularGuia";
import type { IGuiaRepositorio } from "../../dominio/repositorio/IGuiaRepositorio";
import FacturarGuia from "../../aplicacion/casosUso/FacturarGuia";
import { HttpStatus } from "../../common/statusCode";

export class GuiaControlador {
  private crearGuiaUseCase: CrearGuia;
  private listarGuiasUseCase: ListarGuias;
  private facturarGuiaUseCase: FacturarGuia;
  private anularGuiaUseCase: AnularGuia;

  constructor(repositorio: IGuiaRepositorio) {
    this.crearGuiaUseCase = new CrearGuia(repositorio);
    this.listarGuiasUseCase = new ListarGuias(repositorio);
    this.facturarGuiaUseCase = new FacturarGuia(repositorio);
    this.anularGuiaUseCase = new AnularGuia(repositorio);
  }

  async crearGuia(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { numeroGuia, cliente, valorDeclarado } = request.body as any;
      const guia = await this.crearGuiaUseCase.execute(
        numeroGuia,
        cliente,
        valorDeclarado
      );
      return reply.code(HttpStatus.CREADO).send({
        mensaje: "Guía creada exitosamente",
        guia: guia.toJSON()
      });
    } catch (error: any) {
      return reply.code(HttpStatus.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
  }

  async listarGuias(request: FastifyRequest, reply: FastifyReply) {
    try {
      const guias = await this.listarGuiasUseCase.execute();
      return reply.send({
        total: guias.length,
        guias: guias.map(g => g.toJSON())
      });
    } catch (error: any) {
      return reply.code(HttpStatus.ERROR_SERVIDOR).send({ error: error.message });
    }
  }

  async facturarGuia(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { numeroGuia } = request.params as any;
      const guia = await this.facturarGuiaUseCase.execute(numeroGuia);
      return reply.send({
        mensaje: "Guía facturada exitosamente",
        guia: guia.toJSON()
      });
    } catch (error: any) {
      return reply.code(HttpStatus.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
  }

  async anularGuia(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { numeroGuia } = request.params as any;
      const guia = await this.anularGuiaUseCase.execute(numeroGuia);
      return reply.send({
        mensaje: "Guía anulada exitosamente",
        guia: guia.toJSON()
      });
    } catch (error: any) {
      return reply.code(HttpStatus.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
  }
}

export default GuiaControlador;