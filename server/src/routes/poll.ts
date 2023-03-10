import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";
import { CreatePollHandler, GetPollCountHandler, JoinPollHandler, GetPollsHandler, GetPollHandler } from "../request";

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get('/poll/count', async (req, res) => {
    try {
      const count = await new GetPollCountHandler().getPollCount();

      return { count };
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  })

  fastify.post('/poll',
    {
      onRequest: [authenticate]
    },
    async (req, res) => {
      try {
        const createPollBody = z.object({
          title: z.string(),
        })

        const { title } = createPollBody.parse(req.body)
        const response = await new CreatePollHandler().createPoll({ title, ownerId: req.user.sub })

        res.status(201).send(response)
      } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message)
      }
    });

  fastify.post('/polls/join', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {

      const joinPollBody = z.object({
        code: z.string(),
      })

      const { code } = joinPollBody.parse(req.body)

      const data = await new JoinPollHandler().joinPoll(code, req.user.sub);

      res.status(201).send({ data })


    } catch (err) {
      res.status(400).send(err)
    }
  })

  fastify.get('/polls', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {
      const data = await new GetPollsHandler().getPollsHandler(req.user.sub);

      res.status(200).send({ polls: data })
    } catch (err) {
      res.status(400).send(err)
    }
  })

  fastify.get('/poll/:id', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {
      const getPollParams = z.object({
        id: z.string()
      })

      const { id } = getPollParams.parse(req.params)

      const data = await new GetPollHandler().getPollHandler(id);

      res.status(200).send({ poll: data })

    } catch (err) {
      res.status(400).send(err)
    }
  })
}

