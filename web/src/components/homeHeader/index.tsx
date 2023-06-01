import Image from 'next/image'
import LogoImg from '../../assets/logo.svg'

export default function HomeHeader(): JSX.Element {
  return (
    <header className="w-full flex justify-center py-4 bg-ignite-700 border-b border-b-gray-600">
      <Image src={LogoImg} alt="Application logo" />
    </header>
  )
}
