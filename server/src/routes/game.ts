import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { GetGamesHandler } from '../request/game'
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {

  fastify.get('/poll/:id/games', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {

      const getPollParams = z.object({
        id: z.string()
      })

      const { id } = getPollParams.parse(req.params)

      const data = await new GetGamesHandler().getGamesHandler(id, req.user.sub);

      res.status(200).send({ games: data })
    } catch (err) {
      res.status(400).send(err)
    }
  })
}