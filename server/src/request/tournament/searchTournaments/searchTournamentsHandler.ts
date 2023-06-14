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