import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import cors from '@fastify/cors'
import Fastify from "fastify";
import fastifyJwt from '@fastify/jwt';
import { guessesRoutes, pollRoutes, userRoutes, authRoute, teamsRoutes, tournamentRoutes } from './routes'

dotenv.config()


async function bootstrap() {

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(fastifyJwt, {
    secret: process.env.ACCESS_TOKEN_SECRET || "JwTokenSecret"
  })

  fastify.get("/heartbeat", (req, res) => res.send(true))

  await fastify.register(guessesRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);
  await fastify.register(teamsRoutes);
  await fastify.register(tournamentRoutes)

  await fastify.register(authRoute);


  await fastify.listen({
    port: 3333
  });
}

bootstrap()
