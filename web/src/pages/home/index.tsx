import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useState } from 'react'
import { PollCard, UserCard, HomeHeader, StaticsCard, CreatePollModal } from '../../components'

export default function HomePage():JSX.Element {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
    <HomeHeader />
    <div className='flex mt-4 px-4'>
      <UserCard />
      <main className='flex flex-col w-full px-4'>
        <div className='mt-4 flex w-[984px] px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100'>
         <input className='w-full text-base text-gray-100 bg-transparent outline-none' type="text h-full"  placeholder='Pesquise um Bolão' />
         <button>
          <MagnifyingGlass size={32} color={'#F7DD43'}/>
         </button>
        </div>
        <button type='button' className='mt-2 flex items-center gap-1' onClick={() => setIsActive(true)}>
          <Plus size={20}  color={'#F7DD43'}/>
          <h1 className='text-lg text-yellow-500'>criar meu bolão</h1>
        </button>
        <ul className='mt-4'>
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
        </ul>
      </main>
      <StaticsCard />
    </div>
    <CreatePollModal isOpen={isActive} onCloseModal={() => setIsActive(false)} />
    </>
  )
}