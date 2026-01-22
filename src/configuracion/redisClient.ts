import { createClient, type RedisClientType } from 'redis';


async function crearClienteRedis(): Promise<ReturnType<typeof createClient>>{
  const cliente = createClient({
    socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  }});

  // Eventos de conexión
  cliente.on('error', (err) => {
    console.error('Error de Redis:', err);
  });

  cliente.on('connect', () => {
    console.log('Conectado a Redis');
  });

  // Conectar al servidor
  await cliente.connect();

  return cliente;
}

export default crearClienteRedis;
