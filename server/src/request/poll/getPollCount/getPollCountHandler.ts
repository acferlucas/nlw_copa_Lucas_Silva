import prisma from '../../../lib/prisma'

export class GetPollCountHandler {

  public async getPollCount(): Promise<number> {
    try {
      const pollCount = await prisma.poll.count();

      return pollCount
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  constructor() { }
}