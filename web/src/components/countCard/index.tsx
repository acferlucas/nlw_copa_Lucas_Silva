import Image from 'next/image'
import iconCheckImg from '../../assets/icon.svg'

export default function CountCard({
  count,
  isPool,
}: {
  count: number
  isPool?: boolean
}) {
  return (
    <div className="flex items-center gap-6">
      <Image src={iconCheckImg} alt="Icon check img" />
      <div className="flex flex-col">
        <span className="font-bold text-2xl">+{count}</span>
        <span>{isPool ? 'bolões criados' : 'Palpites Enviados'}</span>
      </div>
    </div>
  )
}
