import { Poll } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
import prisma from '../../../lib/prisma'

const generator = new ShortUniqueId({ length: 6 })

export interface CreatePollRequest {
  title: string
}

export class CreatePollHandler {

  public async createPoll(body: CreatePollRequest): Promise<Poll> {
    try {
      const poll = await prisma.poll.create({
        data: {
          title: String(body.title),
          code: String(generator()).toUpperCase()
        }
      })

      return poll
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  constructor() { }
}