import Image from 'next/image'
import LogoImg from '../../assets/logo.svg'

export default function HomeHeader(): JSX.Element {
  return (
    <header className="w-full flex justify-center py-4 border-b border-gray-600">
      <Image src={LogoImg} alt="Application logo" />
    </header>
  )
}
