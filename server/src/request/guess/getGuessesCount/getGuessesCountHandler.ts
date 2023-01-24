import prisma from '../../../lib/prisma'

export class GetGuessesCountHandler {

  public async getGuessesCount(): Promise<number> {
    try {
      const guessesCount = await prisma.guess.count();

      return guessesCount
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  constructor() { }
}