import { Check, X } from 'phosphor-react'
import Team from '../team'
import { PollGame } from '../pollDetailsOptions'
import { useState } from 'react'

export default function Game({ game }: { game: PollGame }): JSX.Element {
  const [firstTimeScore, setFirstTimeScore] = useState<number | null>(() => {
    if (!game.guess) {
      return null
    }
    return game.guess.firstTeamScore
  })
  const [secondTimeScore, setSecondTimeScore] = useState<number | null>(() => {
    if (!game.guess) {
      return null
    }

    return game.guess.secondTeamScore
  })

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
          handlerSetScore={setFirstTimeScore}
          teamScore={firstTimeScore}
          teamAvatarImgUrl={game.firstTeam.teamShieldUrl}
        />
        <X size={32} />
        <Team
          handlerSetScore={setSecondTimeScore}
          teamScore={secondTimeScore}
          teamAvatarImgUrl={game.secondTeam.teamShieldUrl}
        />
      </section>
      {!game.guess && (
        <button
          className="flex items-center justify-center bg-ignite-500 h-12 w-full rounded"
          onClick={() => alert(`${firstTimeScore} x ${secondTimeScore}`)}
        >
          <h1 className="flex items-center justify-center gap-4">
            CONFIRMAR PALPITE <Check size={32} />
          </h1>
        </button>
      )}
    </li>
  )
}
