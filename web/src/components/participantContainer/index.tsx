import Image from 'next/image'

export default function ParticipantContainer({
  participantAvatarUrl,
  hasBorder,
}: {
  participantAvatarUrl: string
  hasBorder?: boolean
}): JSX.Element {
  return (
    <span
      className={`w-16 h-16 rounded-full [&>img]:rounded-full ${
        hasBorder && 'border'
      }`}
    >
      <Image
        src={participantAvatarUrl}
        alt="participant avatar url"
        width={100}
        height={36}
      />
    </span>
  )
}
