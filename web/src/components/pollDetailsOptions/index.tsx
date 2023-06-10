import { useEffect, useState } from 'react'
import Guess from '../guess'
import Participant from '../participant'
import { api } from '../../lib/axios'

interface PollDetailsOptionsProps {
  pollId: string
  menuOption: 'poll' | 'ranking'
}

export interface Game {
  id: string
  guesses: []
  firstTeam: {
    id: string
    teamName: string
    teamShieldUrl: string
  }
  secondTeam: {
    id: string
    teamName: string
    teamShieldUrl: string
  }
}

export default function PollDetailsOptions({
  menuOption,
  pollId,
}: PollDetailsOptionsProps): JSX.Element {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function handleLoadGames() {
      try {
        const { token } = JSON.parse(localStorage.getItem('@token') as string)

        const { data } = await api.get(`/poll/${pollId}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        const { games } = data.poll.tournament

        setGames(games)
      } catch (err: any) {
        console.log(err)
      }
    }

    handleLoadGames()
  }, [pollId])

  if (menuOption === 'poll') {
    return (
      <ul className="h-[640px]  overflow-y-auto">
        {games.map((game) => (
          <Guess key={game.id} game={game} />
        ))}
      </ul>
    )
  }

  return (
    <>
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
    </>
  )
}
