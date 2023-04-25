// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../lib/axios'

export interface User {
  id: string;
		nome: string;
		email: string;
		avatarUrl: string;
		createdAt: string;
    _count: {
			ownpolls: number;
			participatingAt: number;
		}
}

export interface Participants {
    id: string;
    user: {
      avatarUrl: string;
    }
}

export interface Poll {
    id: string;
    title: string;
    code: string;
    ownerId: string;
    createdAt: string;
    participants: Array<Participants>,
    owner: {
      id: string;
      nome: string;
    },
    _count: {
      participants: number;
    }
}

export interface Feed {
  user : User
  polls : Poll[]
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Feed>) {
  const { token } = req.query
  
  const [userResponse, pollsResponse] = await Promise.all([
    api.get('/user', {
    headers : {
      Authorization: 'Bearer ' + token
    }
  }), 
  api.get('/polls',{
    headers : {
      Authorization: 'Bearer ' + token
    }
  })])

  const { polls } = pollsResponse.data
  const { user } = userResponse.data
  
  res.status(200).send({
    polls,
    user
  })
}
