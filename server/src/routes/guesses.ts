import { FastifyInstance } from "fastify";
import { GetGuessesCountHandler } from "../request";

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

}

