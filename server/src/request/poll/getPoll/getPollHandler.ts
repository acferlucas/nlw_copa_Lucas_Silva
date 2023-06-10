import prisma from "../../../lib/prisma";

export class GetPollHandler {
  public async getPollHandler(id: string) {
    try {
      const poll = await prisma.poll.findUnique({
        where: {
          id
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
          },
          tournament: {
            select: {
              id: true,
              name: true,
              games: {
                select: {
                  id: true,
                  guesses: {
                    select: {
                      participantId: true,
                      firstTeamScore: true,
                      secondTeamScore: true,
                    }
                  },
                  firstTeam: true,
                  secondTeam: true,
                }
              }
            }
          }
        }
      })

      return poll;
    } catch (err: any) {
      throw new Error(err)
    }
  }

  constructor() { }
}