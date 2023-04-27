import { ParticipantContainer } from '../../components'
import { FeedPoll } from '../../pages/api/feed'

export default function PollCard({ poll }: { poll: FeedPoll }): JSX.Element {
  if (!poll) {
    return <h1>Loading</h1>
  }

  return (
    <li className="mt-4 w-full h-36 bg-gray-800 p-6 flex items-center justify-between border-b-8 border-yellow-500 rounded-b">
      <span className="h-16 flex flex-col justify-between">
        <strong className="text-white text-2xl">{poll?.title}</strong>
        <p className="text-white">{poll?.owner?.nome}</p>
      </span>
      <div className="flex h-16">
        {poll?.participants?.length > 0 &&
          poll.participants.map((participant) => (
            <ParticipantContainer
              key={participant.id}
              participantAvatarUrl={participant.user.avatarUrl}
            />
          ))}

        <span className="text-white flex items-center justify-center w-16 h-16 border rounded-full">
          +{poll?._count?.participants}
        </span>
      </div>
    </li>
  )
}
