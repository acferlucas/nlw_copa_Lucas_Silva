import prisma from "../../../lib/prisma"

export class GetTournamentsHandler {

  public async getTournaments() {
    try {
      const tournaments = await prisma.tournament.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              Poll: true
            }
          }
        }
      })

      return tournaments
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  constructor() { }
}