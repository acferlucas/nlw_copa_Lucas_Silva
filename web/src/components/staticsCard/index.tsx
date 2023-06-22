import { PresentationChart, SoccerBall } from 'phosphor-react'
import RankingCard from '../rankingCard'

export default function StaticsCard(): JSX.Element {
  return (
    <section className="mt-8 mx-4 right-0 w-[380px] h-[650px]">
      <div className=" bg-gray-800 text-center h-full p-1 rounded">
        <h1 className="text-ignite-600 leading-relaxed font-bold text-2xl flex items-center justify-center gap-2 mt-4">
          <PresentationChart size={32} />
          Dashboard
        </h1>
        <div className="mt-4 border-8 border-gray-600" />
        <section className="w-full p-4 flex gap-4 mt-4">
          <span className="w-full h-16 bg-ignite-600 rounded-xl text-white font-bold grid grid-cols-2 place-items-center justify-center">
            <h1 className="">
              Acertos:
              <p>
                <strong className="text-yellow-700 font-bold">110</strong> Jogos
              </p>
            </h1>
            <strong className="text-yellow-700 text-2xl">+50%</strong>
          </span>
          <span className="w-full h-16 bg-ignite-600 flex rounded-xl text-white font-bold items-center justify-center">
            <h1 className="flex flex-col">
              <strong className="text-yellow-700 text-2xl">+600</strong>
              Jogos Sem Palpitar
            </h1>
          </span>
        </section>
        <div className="mt-4 border-8 border-gray-600" />
        <div className="p-4">
          <h1 className="text-ignite-600 leading-relaxed font-bold text-2xl flex items-center justify-center gap-2">
            <SoccerBall size={32} />
            Favoritos
          </h1>
          <section className="mt-8">
            <ul className="flex flex-col gap-6">
              <RankingCard
                title="Bola 09"
                ownerName="lucas silva"
                position="1"
              />

              <RankingCard title="Bola 10" ownerName="lucas Acf" position="2" />

              <RankingCard title="Bola 12" ownerName="lucas S" position="3" />
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
