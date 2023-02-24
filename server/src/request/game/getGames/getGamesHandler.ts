import prisma from "../../../lib/prisma";

export class GetGamesHandler {

  public async getGamesHandler(pollId: string, userId: string) {
    try {
      const games = await prisma.game.findMany({
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