import Guess from '../guess'
import Participant from '../participant'

interface PollDetailsOptionsProps {
  menuOption: 'poll' | 'ranking'
}

export default function PollDetailsOptions({
  menuOption,
}: PollDetailsOptionsProps): JSX.Element {
  if (menuOption === 'poll') {
    return (
      <ul className="h-[640px]  overflow-y-auto">
        <Guess />
        <Guess />
        <Guess />
      </ul>
    )
  }

  return (
    <>
      <Participant />
      <Participant />
      <Participant />
      <Participant />
      <Participant />
    </>
  )
}
