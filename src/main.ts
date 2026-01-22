import 'dotenv/config';
import fastify from 'fastify';
import crearClienteRedis from './configuracion/redisClient.js';
import RedisGuiaRepositorio from './infraestructura/persistencia/RedisGuiaRepositorio.js';
import { GuiaControlador } from './infraestructura/controlador/GuiaControlador.js';
import { GuiaRutas } from './infraestructura/rutas/GuiaRutas.js';
import type { RedisClientType } from 'redis';

async function main() {
  try {
    console.log('Conectando a Redis...');
    const clienteRedis = await crearClienteRedis() as RedisClientType;

    const repositorio = new RedisGuiaRepositorio(clienteRedis);
    const guiaControlador = new GuiaControlador(repositorio);

    const app = fastify({ logger: true });

    await app.register(GuiaRutas, { guiaControlador });

    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor iniciado en http://localhost:3000');

    process.on('SIGINT', async () => {
      console.log('\nCerrando servidor...');
      await clienteRedis.quit();
      await app.close();
      process.exit(0);
    });
  } catch (err) {
    console.error('Error al iniciar:', err);
    process.exit(1);
  }
}

main();
