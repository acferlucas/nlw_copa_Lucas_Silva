import { FastifyInstance } from "fastify";
import { GetUsersCountHandler, GetUserHandler } from "../request";
import { authenticate } from "../plugins/authenticate";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async (req, res) => {
    try {
      const count = await new GetUsersCountHandler().getUsersCount();

      return { count }
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  })

  fastify.get('/user', {
    onRequest: [authenticate]
  }, async (req, res) => {
    try {
      const user = await new GetUserHandler().getUser(req.user.sub)

      res.status(200).send({ user })
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error.message)
    }
  })
}

