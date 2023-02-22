import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from '../lib/prisma'
import { authenticate } from "../plugins/authenticate";

export async function authRoute(fastify: FastifyInstance) {
  fastify.post('/users/auth/google', async (req, res) => {
    try {
      const createUserBody = z.object({
        access_token: z.string(),
      });
      const { access_token } = createUserBody.parse(req.body)

      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      const userData = await userResponse.json();

      const userInfoSchema = z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
        picture: z.string().url(),
      })

      const userInfo = userInfoSchema.parse(userData);

      let user = await prisma.user.findUnique({
        where: {
          email: userInfo.email
        }
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            nome: userInfo.name,
            email: userInfo.email,
            avatarUrl: userInfo.picture
          }
        })
      }

      const token = fastify.jwt.sign({
        name: user.nome,
        avatarUrl: user.avatarUrl,
        email: user.email
      }, {
        sub: user.id,
        expiresIn: '7 days',
      })


      return { token }

    } catch (err) {
      res.status(401).send({ message: 'Token invalido' })
    }


  })

  fastify.get('/me',
    {
      onRequest: [authenticate]
    },
    async (req, res) => {
      try {
        return { user: req.user }
      } catch (err) {
        res.status(401).send({ message: err })
      }
    })
}