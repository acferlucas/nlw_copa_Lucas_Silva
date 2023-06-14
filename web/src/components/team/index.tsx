import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

interface TeamProps {
  teamScore: number | null
  teamAvatarImgUrl: string
  handlerSetScore: Dispatch<SetStateAction<number | null>>
}

export default function Team({
  teamAvatarImgUrl,
  teamScore,
  handlerSetScore,
}: TeamProps): JSX.Element {
  return (
    <div className="flex gap-4 [&>img]:w-14 h-16">
      <input
        onChange={(e) => handlerSetScore(Number(e.target.value))}
        value={teamScore || undefined}
        className="w-14 h-16 text-xl p-4 rounded bg-ignite-900 text-white font-bold"
        type="text"
      />
      <Image src={teamAvatarImgUrl} alt={'team Code'} width={24} height={24} />
    </div>
  )
}
