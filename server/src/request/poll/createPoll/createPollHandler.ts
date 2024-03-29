import { Poll } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
import prisma from '../../../lib/prisma'

const generator = new ShortUniqueId({ length: 6 })

export class CreatePollHandler {

  public async createPoll(title: string, ownerId: string): Promise<Poll> {
    try {
      const poll = await prisma.poll.create({
        data: {
          title,
          code: generator().toUpperCase(),
          ownerId,

          participants: {
            create: {
              userId: ownerId
            }
          }
        },
        include: {
          participants: {
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                }
              }
            },
          },
          owner: {
            select: {
              id: true,
              nome: true,
            }
          }
        }
      })


      return poll
    } catch (err: any) {
      console.log(err)
      throw new Error(err.message)
    }
  }
  constructor() { }
}