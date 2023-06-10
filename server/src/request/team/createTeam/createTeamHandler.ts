import prisma from '../../../lib/prisma'

export class CreateTeamHandler {

  public async createTeam(teamName: string, teamShieldUrl: string) {
    try {
      const team = await prisma.team.create({
        data: {
          teamName,
          teamShieldUrl,
        }
      })

      return team;

    } catch (err: any) {
      console.log(err)
      throw new Error(err.message)
    }
  };

  constructor() { };
}