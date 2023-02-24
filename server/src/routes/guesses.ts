import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { authenticate } from "../plugins/authenticate";
import { GetGuessesCountHandler, CreateGuessHandler } from "../request/guess";

export async function guessesRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', async (req, res) => {
    try {
      const count = await new GetGuessesCountHandler().getGuessesCount();

      return { count };
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  })

  fastify.post('/polls/:pollId/games/:gameId/guesses', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {
      const createGuessParams = z.object({
        pollId: z.string(),
        gameId: z.string()
      })

      const createGuessBody = z.object({
        firstTeamScore: z.number(),
        secondTeamScore: z.number()
      })

      const { pollId, gameId } = createGuessParams.parse(req.params)

      const { firstTeamScore, secondTeamScore } = createGuessBody.parse(req.body)

      let requestBody = {
        pollId,
        gameId,
        firstTeamScore,
        secondTeamScore,
        userId: req.user.sub
      }

      const data = await new CreateGuessHandler().createGuessHandler(requestBody);

      res.status(201).send({ data: data })

    } catch (err: any) {
      throw new Error(err)
    }
  })

}

