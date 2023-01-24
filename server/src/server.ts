import cors from '@fastify/cors'
import Fastify from "fastify";
import { guessesRoutes, pollRoutes, userRoutes } from './routes'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(guessesRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);


  await fastify.listen({
    port: 3333
  });
}

bootstrap()
