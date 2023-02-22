import { Poll } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
import prisma from '../../../lib/prisma'

const generator = new ShortUniqueId({ length: 6 })

export interface CreatePollRequest {
  title: string
  ownerId: string
}

export class CreatePollHandler {

  public async createPoll(body: CreatePollRequest): Promise<Poll> {
    try {
      const poll = await prisma.poll.create({
        data: {
          title: body.title,
          code: generator().toUpperCase(),
          ownerId: body.ownerId,

          participants: {
            create: {
              userId: body.ownerId
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