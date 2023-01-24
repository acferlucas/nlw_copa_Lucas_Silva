import { FastifyInstance } from "fastify";
import { GetUsersCountHandler } from "../request";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async (req, res) => {
    try {
      const count = await new GetUsersCountHandler().getUsersCount();

      return count
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  })
}

