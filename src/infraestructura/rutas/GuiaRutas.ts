import type { FastifyInstance } from 'fastify';
import { GuiaControlador } from '../controlador/GuiaControlador';

export async function GuiaRutas(
  fastify: FastifyInstance,
  options: any
) {
  const guiaControlador: GuiaControlador = options.guiaControlador;

  fastify.post('/guias', (request, reply) =>
    guiaControlador.crearGuia(request, reply)
  );

  fastify.get('/guias', (request, reply) =>
    guiaControlador.listarGuias(request, reply)
  );

  fastify.post('/guias/:numeroGuia/facturar', (request, reply) =>
    guiaControlador.facturarGuia(request, reply)
  );

  fastify.post('/guias/:numeroGuia/anular', (request, reply) =>
    guiaControlador.anularGuia(request, reply)
  );
}

export default GuiaRutas;
