import { FastifyInstance } from "fastify";
import { z } from "zod";
import { CreatePollHandler, GetPollCountHandler } from "../request";

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get('/poll/count', async (req, res) => {
    try {
      const count = await new GetPollCountHandler().getPollCount();

      return count;
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
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
}

