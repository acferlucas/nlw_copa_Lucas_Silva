interface RankingCardProps {
  title: string
  ownerName: string
  position: string
}

export default function RankingCard({
  title,
  ownerName,
  position,
}: RankingCardProps): JSX.Element {
  return (
    <li className="w-full h-20  rounded-md border-b  flex p-4 bg-gray-900 text-white">
      <div className="w-full h-full text-left flex flex-col justify-between">
        <h1>{title}</h1>
        <strong>{ownerName}</strong>
      </div>
      <span className="h-11 w-12 border flex items-center justify-center rounded-full bg-yellow-700 font-bold text-xl">
        {position}°
      </span>
    </li>
  )
}
