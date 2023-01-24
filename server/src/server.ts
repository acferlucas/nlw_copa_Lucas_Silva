import { CreatePollHandler } from './request'
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


  fastify.get('/poll/count', async (req, res) => {
    const count = await prisma.poll.count();

    return { count }
  })

  fastify.post('/poll', async (req, res) => {
    try {
      const createPollBody = z.object({
        title: z.string(),
      })

      const { title } = createPollBody.parse(req.body)
      const response = await new CreatePollHandler().createPoll({ title })

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
