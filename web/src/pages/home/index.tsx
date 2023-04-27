import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'
import { PollCard, UserCard, HomeHeader, StaticsCard, HomeMenuModal, HomeMenu, CreatePollComponent, SearchPollComponent } from '../../components'

import { Poll, User } from '../api/feed'


export default function HomePage():JSX.Element {
  const [polls, setPolls] = useState<Poll[]>([])
  const [user, setUser] = useState<User>()

  const [openModal, setOpenModal] = useState(false);
  const [createPollModalisActive, setCreatePollModalIsActive] = useState(false);
  
  const [searchPollModalisActive, setSearchPollModalIsActive] = useState(false);
  const [input, setInput] = useState('');
  
  const filterPolls = input.length > 0 ? polls.filter(poll => poll.title.toLowerCase().includes(input.toLowerCase())) : polls
  
  const loadUserFeed = useCallback(async () => {
    const { token } = JSON.parse(localStorage.getItem('@token') as string);
    
    const response = await fetch(`/api/feed?token=${token}`);
    const { user, polls } = await response.json();
    
    localStorage.setItem('user', JSON.stringify(user))
    setPolls(polls)
    setUser(user)
  }, []);
  
  useEffect(() => {
    loadUserFeed();
  }, [loadUserFeed]);

  function handlerCreatePollModal(): void {
    setOpenModal(true)
    setSearchPollModalIsActive(false)
    setCreatePollModalIsActive(true)
  }

  function handlerSearchPollModal(): void {
    setOpenModal(true)
    setCreatePollModalIsActive(false)
    setSearchPollModalIsActive(true)
  }

  return (
    <>
    <HomeHeader />
    <div className='flex mt-4 px-4'>
      <UserCard user={user}/>
      <main className='flex flex-col w-full px-4'>
        <div className='mt-4 flex w-[984px] px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100'>
         <input 
         className='w-full text-base text-gray-100 bg-transparent outline-none' type="text h-full"  
         placeholder='Pesquise um Bolão' 
         value={input}
         onChange={ e => setInput(e.target.value)}
         />
         <button>
          <MagnifyingGlass size={32} color={'#F7DD43'}/>
         </button>
        </div>
        <HomeMenu handlerCreatePoll={handlerCreatePollModal} handlerSearchPoll={handlerSearchPollModal} />
        <ul className='mt-4'>
          { filterPolls.length > 0 && filterPolls.map(poll => <PollCard key={poll.id} poll={poll} /> ) }
        </ul>
      </main>
      <StaticsCard />
    </div>
    <HomeMenuModal isOpen={openModal} onCloseModal={() => setOpenModal(false)}>
       { searchPollModalisActive && <SearchPollComponent /> }
       { createPollModalisActive && <CreatePollComponent handlerCloseModal={() => setOpenModal(false)}/> }
    </HomeMenuModal>
    </>
  )
}