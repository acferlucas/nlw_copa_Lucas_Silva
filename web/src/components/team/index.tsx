import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

interface TeamProps {
  teamScore: string | null
  teamAvatarImgUrl: string
  handlerSetScore: Dispatch<SetStateAction<string | null>>
  hasGuess: boolean
}

export default function Team({
  teamAvatarImgUrl,
  teamScore,
  handlerSetScore,
  hasGuess,
}: TeamProps): JSX.Element {
  return (
    <div className="flex gap-4 [&>img]:w-14 h-16">
      <input
        onChange={(e) => handlerSetScore(String(e.target.value))}
        value={teamScore ? String(teamScore) : undefined}
        className="w-14 h-16 text-xl p-4 rounded bg-ignite-900 text-white font-bold"
        type="text"
        disabled={hasGuess}
      />
      <Image src={teamAvatarImgUrl} alt={'team Code'} width={24} height={24} />
    </div>
  )
}
