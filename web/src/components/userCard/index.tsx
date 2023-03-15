import Image from 'next/image'
import { GameController,  UsersThree } from 'phosphor-react'
import userExample from '../../assets/user.png'

export default function UserCard():JSX.Element {
  return (
    <aside className=''>
        <section className='px-4 w-80 h-80 p-4 flex flex-col bg-gray-800 border border-transparent rounded-2xl'>
            <div className=''>
              <div className='w-32 h-32  flex items-center justify-center rounded-full mx-auto bg-gray-900 border border-gray-700 [&>img]:rounded-full'>
                <Image  width={116} height={116} src={userExample} alt="Application logo" />
              </div>
              <h1 className='text-center font-bold text-white text-2xl'>Lucas Silva</h1>
            </div>
            <footer className='my-auto flex flex-col justify-center items-center'>
              <span className=' h-10 text-white flex items-center gap-4'><UsersThree size={32} /> Participando em: <strong className='text-ignite-500'>100</strong></span>
              <span className=' h-10 text-white flex items-center gap-4'><GameController size={32} />Total de Pontos: <strong className='text-ignite-500'>+99</strong></span>
            </footer>
        </section>
      </aside>
  )
}