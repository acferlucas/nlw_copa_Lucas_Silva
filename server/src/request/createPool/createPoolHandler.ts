import { Pool } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
import prisma from '../../lib/prisma'

const generator = new ShortUniqueId({ length: 6 })

export interface CreatePoolRequest {
  title: string
}

export class CreatePoolHandler {

  public async createPool(body: CreatePoolRequest): Promise<Pool> {
    try {
      const pool = await prisma.pool.create({
        data: {
          title: String(body.title),
          code: String(generator()).toUpperCase()
        }
      })

      return pool
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  constructor() { }
}