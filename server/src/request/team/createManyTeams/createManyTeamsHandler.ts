import prisma from '../../../lib/prisma'

interface createManyTeamsHandlerRequest {
  teamName: string;
  teamShieldUrl: string;
}


export class CreateManyTeamsHandler {

  public createManyTeamsHandler(teams: Array<createManyTeamsHandlerRequest>) {
    try {
      teams.map(async team => {
        return await prisma.team.create(
          {
            data: {
              teamName: team.teamName,
              teamShieldUrl: team.teamShieldUrl
            }
          }
        )
      })

      return true;
    } catch (err: any) {
      console.log(err)
      throw new Error(err.message)
    }
  };

  constructor() { };
}