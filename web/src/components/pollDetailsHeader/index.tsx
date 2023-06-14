import { CaretLeft, Copy } from 'phosphor-react'
import ParticipantsWrapper from '../participantSWrapper'
import { FeedPoll } from '../../pages/api/feed'

interface PollDetailsHeaderProps {
  handlerChangeSelectedPoll: () => void
  poll: FeedPoll
}

export default function PollDetailsHeader({
  handlerChangeSelectedPoll,
  poll,
}: PollDetailsHeaderProps): JSX.Element {
  return (
    <>
      <button onClick={handlerChangeSelectedPoll}>
        <CaretLeft size={28} color="#fff" />
      </button>
      <div className="flex w-[984px] px-6 py-4 justify-between items-center border-b border-gray-600">
        <span className="text-white flex flex-col gap-4">
          <h1 className="font-bold text-2xl">{poll.title}</h1>
          <p className="flex items-center gap-1">
            Código:
            <strong className="flex items-center gap-1">
              {poll.code}{' '}
              <button onClick={() => navigator.clipboard.writeText(poll.code)}>
                <Copy size={18} />
              </button>
            </strong>
          </p>
        </span>
        <ParticipantsWrapper
          participants={poll.participants}
          participantsCount={poll._count.participants}
        />
      </div>
    </>
  )
}
