import { Check, X } from 'phosphor-react'
import Team from '../team'
import { PollGame } from '../pollDetailsOptions'
import { useState } from 'react'
import { api } from '../../lib/axios'

interface GameProps {
  game: PollGame
  pollId: string
  onGuessConfirm: () => void
}

export default function Game({
  game,
  pollId,
  onGuessConfirm,
}: GameProps): JSX.Element {
  const [firstTimeScore, setFirstTimeScore] = useState<string | null>(() => {
    if (!game.guess) {
      return null
    }
    return String(game.guess.firstTeamScore)
  })
  const [secondTimeScore, setSecondTimeScore] = useState<string | null>(() => {
    if (!game.guess) {
      return null
    }

    return String(game.guess.secondTeamScore)
  })

  async function handlerTakeGuessGame(): Promise<void> {
    try {
      const { token } = JSON.parse(localStorage.getItem('@token') as string)

      if (firstTimeScore === null || secondTimeScore === null) {
        alert('Por favor, preencha o placar para completar o palpite.')
        return
      }

      if (firstTimeScore.trim() === '' || secondTimeScore.trim() === '') {
        alert('Por favor, preencha o placar')

        return
      }

      await api.post(
        `/polls/${pollId}/games/${game.id}/guesses`,
        {
          firstTeamScore: Number(firstTimeScore),
          secondTeamScore: Number(secondTimeScore),
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )

      onGuessConfirm()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li className="text-white bg-gray-600 mt-4 p-4 rounded border-b-4 border-yellow-700">
      <h1 className="text-center text-2xl font-bold">
        {game.firstTeam.teamName} vs {game.secondTeam.teamName}
      </h1>
      <p className="text-center mt-2 leading-relaxed text-xl">
        22 de Novembro de 2022 ás 16h00h
      </p>
      <section className="flex justify-between items-center px-4 pb-5">
        <Team
          hasGuess={!!game.guess?.firstTeamScore}
          handlerSetScore={setFirstTimeScore}
          teamScore={firstTimeScore}
          teamAvatarImgUrl={game.firstTeam.teamShieldUrl}
        />
        <X size={32} />
        <Team
          hasGuess={!!game.guess?.secondTeamScore}
          handlerSetScore={setSecondTimeScore}
          teamScore={secondTimeScore}
          teamAvatarImgUrl={game.secondTeam.teamShieldUrl}
        />
      </section>
      {!game.guess && (
        <button
          className="flex items-center justify-center bg-ignite-500 h-12 w-full rounded"
          onClick={handlerTakeGuessGame}
        >
          <h1 className="flex items-center justify-center gap-4">
            CONFIRMAR PALPITE <Check size={32} />
          </h1>
        </button>
      )}
    </li>
  )
}
