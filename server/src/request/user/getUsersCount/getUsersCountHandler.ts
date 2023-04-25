import prisma from '../../../lib/prisma'

export class GetUsersCountHandler {

  public async getUsersCount(): Promise<number> {
    try {
      const usersCount = await prisma.user.count();

      return usersCount
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  constructor() { }
}
