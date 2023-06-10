import { X } from 'phosphor-react'
import Team from '../team'
import { Game } from '../pollDetailsOptions'

export default function Guess({ game }: { game: Game }): JSX.Element {
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
          teamCode={game.firstTeam.teamName}
          teamAvatarImgUrl={game.firstTeam.teamShieldUrl}
        />
        <X size={32} />
        <Team
          teamCode={game.secondTeam.teamName}
          teamAvatarImgUrl={game.secondTeam.teamShieldUrl}
        />
      </section>
    </li>
  )
}
