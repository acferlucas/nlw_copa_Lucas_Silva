import { CreatePoolHandler } from './request'
import cors from '@fastify/cors'
import { z } from 'zod'
import Fastify from "fastify";
import prisma from './lib/prisma'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/users/count', async (req, res) => {
    const users = await prisma.user.count();

    return { users }
  })

  fastify.get('/guesses/count', async (req, res) => {
    const guesses = await prisma.guess.count();

    return { guesses }
  })


  fastify.get('/pools/count', async (req, res) => {
    const count = await prisma.pool.count();

    return { count }
  })

  fastify.post('/pools', async (req, res) => {
    try {
      const createPoolBody = z.object({
        title: z.string(),
      })

      const { title } = createPoolBody.parse(req.body)
      const response = await new CreatePoolHandler().createPool({ title })

      res.status(201).send(response)
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  });

  await fastify.listen({
    port: 3333
  });
}

bootstrap()
