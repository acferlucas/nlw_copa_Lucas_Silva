import { GameController, SoccerBall, Trophy } from 'phosphor-react'

export interface Tournament {
  id: string
  name: string
  startDate: string
  endDate: string
  _count: {
    Poll: number
    games: number
  }
}

interface TournamentProps {
  tournament: Tournament
}

export default function PollTournament({
  tournament,
}: TournamentProps): JSX.Element {
  return (
    <li
      key={tournament.id}
      className="w-full h-36 bg-gray-800 p-4 flex items-center border-b-8 border-ignite-white rounded-b cursor-pointer text-white gap-2"
    >
      <span className="h-full">
        <Trophy size={82} color={'#F7DD43'} />
      </span>
      <div className="h-full">
        <h1 className="text-white text-2xl font-bold leading-tight">
          {tournament.name}
        </h1>
        <p className="w-[620px] text-sm text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          tempore aut rerum, quo eos hic quaerat est voluptatem molestias
          reprehenderit dolor magni iusto porro,
        </p>
      </div>
      <span className="h-full">
        <div className="flex items-center gap-6">
          <SoccerBall size={40} />

          <div className="flex flex-col">
            <span className="font-bold text-xl text-ignite-500">
              + {tournament._count.games}
            </span>
            <span className="font-bold">Jogos</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <GameController size={40} />
          <div className="flex flex-col">
            <span className="font-bold text-xl text-ignite-500">
              +{tournament._count.Poll}
            </span>
            <span className="font-bold">Bolões</span>
          </div>
        </div>
      </span>
    </li>
  )
}
