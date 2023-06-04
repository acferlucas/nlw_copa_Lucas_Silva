import { FeedPoll } from '../../pages/api/feed'
import ParticipantsWrapper from '../participantSWrapper'

interface PollCardProps {
  poll: FeedPoll
  onPollClicked?: () => void
}

export default function PollCard({
  poll,
  onPollClicked,
}: PollCardProps): JSX.Element {
  if (!poll) {
    return <h1>Loading</h1>
  }

  return (
    <li
      onClick={onPollClicked || undefined}
      className="mt-4 w-full h-36 bg-gray-800 p-6 flex items-center justify-between border-b-8 border-yellow-500 rounded-b cursor-pointer"
    >
      <span className="h-16 flex flex-col justify-between">
        <strong className="text-white text-2xl">{poll?.title}</strong>
        <p className="text-white">{poll?.owner?.nome}</p>
      </span>
      <ParticipantsWrapper
        participants={poll.participants}
        participantsCount={poll._count.participants}
      />
    </li>
  )
}
