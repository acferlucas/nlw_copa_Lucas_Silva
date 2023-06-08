import Image, { StaticImageData } from 'next/image'

interface TeamProps {
  teamCode: string
  teamAvatarImgUrl: StaticImageData
}

export default function Team({
  teamAvatarImgUrl,
  teamCode,
}: TeamProps): JSX.Element {
  return (
    <div className="flex gap-4 [&>img]:w-14 h-16">
      <input
        className="w-14 h-16 text-xl p-4 rounded bg-ignite-900 text-white font-bold"
        type="text"
      />
      <Image src={teamAvatarImgUrl} alt={teamCode} />
    </div>
  )
}
