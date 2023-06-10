import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";
import { CreateTeamHandler } from "../request/team/createTeam/createTeamHandler";
import { CreateManyTeamsHandler } from "../request/team/createManyTeams/createManyTeamsHandler";

export async function teamsRoutes(fastify: FastifyInstance) {

  fastify.post('/team', {
    onRequest: [authenticate]
  },
    async (req, res) => {
      try {
        const teamBody = z.object({
          teamName: z.string(),
          teamShieldUrl: z.string()
        })

        const { teamName, teamShieldUrl } = teamBody.parse(req.body)

        const data = await new CreateTeamHandler().createTeam(teamName, teamShieldUrl)

        res.status(200).send({ data })
      } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message)
      }
    })

  fastify.post('/create_many/team', {
    onRequest: [authenticate]
  },
    async (req, res) => {
      try {

        const teamBody = z.object({
          teamName: z.string(),
          teamShieldUrl: z.string()
        })

        const manyTeamsBody = z.object({
          teams: z.array(teamBody),
        })


        const { teams } = manyTeamsBody.parse(req.body)

        const data = new CreateManyTeamsHandler().createManyTeamsHandler(teams)
        res.status(200).send({ data, })
      } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message)
      }
    })
}

