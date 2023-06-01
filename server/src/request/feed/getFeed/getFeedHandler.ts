import prisma from "../../../lib/prisma"

export class GetFeedHandler {

  public async getFeed(userId: string, page: string, maxPerPage: string) {
    try {

      const totalItems = await prisma.poll.count({
        where: {
          participants: {
            some: {
              userId: userId
            }
          }
        }
      });
      const skip = (Number(page) - 1) * Number(maxPerPage);

      const polls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              userId: userId
            }
          },
        },
        take: Number(maxPerPage),
        skip,
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

      return { totalItems, polls };
    } catch (err: any) {
      throw new Error(err)
    }
  }

  constructor() { }
}