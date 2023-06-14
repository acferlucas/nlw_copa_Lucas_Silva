import { useEffect, useState } from 'react'
import Game from '../game'
import Participant from '../participant'
import { api } from '../../lib/axios'

interface PollDetailsOptionsProps {
  pollId: string
  tournamentId: string | null
  menuOption: 'poll' | 'ranking'
}

interface Team {
  id: string
  teamName: string
  teamShieldUrl: string
}

interface PollGameGuess {
  id: string
  participantId: string
  gameId: string
  firstTeamScore: number
  secondTeamScore: number
  createdAt: string
}

export interface PollGame {
  id: string
  date: string
  firstTeamId: string
  firstTeam: Team
  secondTeamId: string
  secondTeam: Team
  tournamentId: string
  guess: PollGameGuess | null
}

export default function PollDetailsOptions({
  menuOption,
  pollId,
  tournamentId,
}: PollDetailsOptionsProps): JSX.Element {
  const [games, setGames] = useState<PollGame[]>([])

  useEffect(() => {
    async function handleLoadGames() {
      try {
        const { token } = JSON.parse(localStorage.getItem('@token') as string)

        const { data } = await api.get(
          `/poll/${pollId}/games/${tournamentId}`,
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )

        setGames(data.data.games)
      } catch (err: any) {
        console.log(err)
      }
    }

    handleLoadGames()
  }, [pollId, tournamentId])

  if (menuOption === 'poll') {
    return (
      <ul className="h-[640px] overflow-y-auto">
        {games.length > 0 ? (
          games.map((game) => <Game key={game.id} game={game} />)
        ) : (
          <h1 className="font-bold text-2xl text-white mt-4">
            Este bolão não possui torneio,{' '}
            <button
              className="text-yellow-700"
              onClick={() => alert('Clicou no botão para associar um torneio')}
            >
              associe um torneio
            </button>
          </h1>
        )}
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
