import prisma from "../../../lib/prisma";

export class SearchTournamentsHandler {

  public async searchTournaments(search: string) {
    try {
      const tournaments = await prisma.tournament.findMany({
        where: {
          name: {
            contains: search
          }
        },
        select: {
          id: true,
          name: true,
          startDate: true,
          endDate: true,
          _count: {
            select: {
              Poll: true,
              games: true,
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