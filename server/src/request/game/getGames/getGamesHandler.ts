import prisma from "../../../lib/prisma";

export class GetGamesHandler {

  public async getGamesHandler(pollId: string, userId: string, tournamentId: string) {
    try {
      const games = await prisma.game.findMany({
        where: {
          tournamentId,
        },
        orderBy: {
          date: 'desc'
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId,
                pollId,
              }
            }
          },
          firstTeam: {
            select: {
              id: true,
              teamName: true,
              teamShieldUrl: true,
            }
          },
          secondTeam: {
            select: {
              id: true,
              teamName: true,
              teamShieldUrl: true,
            }
          }
        }
      })

      return {
        games: games.map(game => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined
          }
        })
      };
    } catch (err: any) {
      throw new Error(err)
    }
  }

  constructor() { }
}