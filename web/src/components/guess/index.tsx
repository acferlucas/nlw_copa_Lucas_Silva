import { X } from 'phosphor-react'
import stcSheild from '../../assets/santa_cruz.png'
import noShield from '../../assets/no_team.jpg'
import Team from '../team'

export default function Guess(): JSX.Element {
  return (
    <li className="text-white bg-gray-600 mt-4 p-4 rounded border-b-4 border-yellow-700">
      <h1 className="text-center text-2xl font-bold">Brasil vs Argentina</h1>
      <p className="text-center mt-2 leading-relaxed text-xl">
        22 de Novembro de 2022 ás 16h00h
      </p>
      <section className="flex justify-between items-center px-4 pb-5">
        <Team teamCode="SantaCruz" teamAvatarImgUrl={stcSheild} />
        <X size={32} />
        <Team teamCode="Sport" teamAvatarImgUrl={noShield} />
      </section>
    </li>
  )
}
