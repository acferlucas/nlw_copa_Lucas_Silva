import prisma from "../../../lib/prisma";

export class GetPollsHandler {

  public async getPollsHandler(userId: string) {
    try {
      const polls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              userId: userId
            }
          }
        },
        include: {
          _count: {
            select: {
              participants: true
            }
          },
          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
            take: 4,
          },
          owner: {
            select: {
              id: true,
              nome: true,
            }
          }
        }
      })

      return polls
    } catch (err: any) {
      throw new Error(err)
    }
  }

  constructor() { }
}
