import Image from 'next/image'

export default function ParticipantContainer({ participantAvatarUrl }: { participantAvatarUrl: string }):JSX.Element {
  return (
    <span className='w-16 h-16 border rounded-full'>
      <Image src={participantAvatarUrl} alt="participant avatar url" width={100} height={36} />
    </span>
  )
}