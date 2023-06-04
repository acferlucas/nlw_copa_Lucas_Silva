import { X } from 'phosphor-react'
import brazilianImg from '../../assets/brazil.png'
import Image from 'next/image'

export default function Guess(): JSX.Element {
  return (
    <li className="text-white bg-gray-600 mt-4 p-4 rounded border-b-4 border-yellow-700">
      <h1 className="text-center text-2xl font-bold">Brasil vs Argentina</h1>
      <p className="text-center mt-2 leading-relaxed text-xl">
        22 de Novembro de 2022 ás 16h00h
      </p>
      <section className="flex justify-between items-center px-4 pb-5">
        <div className="flex gap-4 [&>img]:w-14 h-16">
          <input
            className="w-14 h-16 text-xl p-4 rounded bg-ignite-900 text-white font-bold"
            type="text"
          />
          <Image src={brazilianImg} alt="brazilianImg" />
        </div>
        <X size={32} />
        <div className="flex gap-4 [&>img]:w-14 h-16">
          <input
            className="w-14 h-16 text-xl p-4 rounded bg-ignite-900 text-white font-bold"
            type="text"
          />
          <Image src={brazilianImg} alt="brazilianImg" />
        </div>
      </section>
    </li>
  )
}
