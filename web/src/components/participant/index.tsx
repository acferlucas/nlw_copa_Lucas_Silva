import userImg from '../../assets/user.png'
import ParticipantContainer from '../participantContainer'

export default function Participant(): JSX.Element {
  return (
    <div className="text-white bg-gray-600 mt-4 p-4 rounded flex gap-4 items-center">
      <ParticipantContainer participantAvatarUrl={userImg} />
      <div>
        <h1 className="text-2xl font-bold">Lucas Acfer S</h1>
        <p className="text-xl">36 ponto(s)</p>
      </div>
      <span className="flex ml-auto h-12 w-12 bg-yellow-500 items-center justify-center rounded-full text-ignite-900 font-bold text-xl">
        1°
      </span>
    </div>
  )
}
