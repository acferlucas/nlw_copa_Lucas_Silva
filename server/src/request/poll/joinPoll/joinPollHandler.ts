import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

export class JoinPollHandler {

  public async joinPoll(code: string, userId: string): Promise<boolean | undefined> {
    try {
      const poll = await prisma.poll.findUnique({
        where: {
          code,
        },
        include: {
          participants: {
            where: {
              userId: userId
            }
          }
        }
      })

      if (!poll) throw new Error(`Não foi possível encontrar bolão ${code}`)

      if (poll.participants.length > 0) throw new Error(`Usuário já está participando do bolão`)

      await prisma.participant.create({
        data: {
          pollId: poll.id,
          userId: userId,
        }
      })

      return true;

    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(err.message)
      }
    }
  };

  constructor() { }
}