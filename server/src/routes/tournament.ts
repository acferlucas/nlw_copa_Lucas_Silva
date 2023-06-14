import { FastifyInstance } from "fastify";
import { GetTournamentsHandler, SearchTournamentsHandler } from "../request";
import { z } from "zod";

export async function tournamentRoutes(fastify: FastifyInstance) {
  fastify.get('/tournament/search', async (req, res) => {
    try {
      const searchQuery = z.object({
        name: z.string(),
      })

      const { name } = searchQuery.parse(req.query)

      const data = await new SearchTournamentsHandler().searchTournaments(name)

      res.status(200).send({ data })
    } catch (err) {
      res.status(400).send(err)
    }
  })

  fastify.get('/tournament', async (req, res) => {
    try {
      const data = await new GetTournamentsHandler().getTournaments()

      res.status(200).send({ data })
    } catch (err) {
      res.status(400).send(err)
    }
  })
}

