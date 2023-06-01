import prisma from "../../../lib/prisma"

export class SearchPollHandler {
  public async searchPoll(search: string) {
    try {
      const polls = await prisma.poll.findMany({
        where: {
          code: {
            contains: search
          }
        },
        include: {
          _count: {
            select: {
              participants: true
            },
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

      return polls;
    } catch (err: any) {
      throw new Error(err)
    }
  }
  constructor() { }

}