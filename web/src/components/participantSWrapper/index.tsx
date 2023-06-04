import { ParticipantContainer } from '..'
import { Participants } from '../../pages/api/feed'

interface ParticipantsWrapperProps {
  participants: Array<Participants>
  participantsCount: number
}

export default function ParticipantsWrapper({
  participants,
  participantsCount,
}: ParticipantsWrapperProps): JSX.Element {
  return (
    <div className="flex h-16">
      {participants.map((participant) => (
        <ParticipantContainer
          hasBorder
          key={participant.id}
          participantAvatarUrl={participant.user.avatarUrl}
        />
      ))}

      <span className="text-white flex items-center justify-center w-16 h-16 border rounded-full">
        +{participantsCount}
      </span>
    </div>
  )
}
