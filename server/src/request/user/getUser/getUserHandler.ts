import prisma from '../../../lib/prisma'

export class GetUserHandler {

  public async getUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          _count: {
            select: {
              ownpolls: true,
              participatingAt: true,
            }
          }
        },
      })

      return user;
    } catch (err: any) {
      throw new Error(err.message)
    }


  }
}