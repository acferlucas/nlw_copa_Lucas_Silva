import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useMemo, useState } from 'react'
import {
  PollCard,
  UserCard,
  HomeHeader,
  StaticsCard,
  HomeMenuModal,
  HomeMenu,
  CreatePollComponent,
  SearchPollComponent,
} from '../../components'

import { FeedPoll, User } from '../api/feed'

export default function HomePage(): JSX.Element {
  const [polls, setPolls] = useState<FeedPoll[]>([])
  const [user, setUser] = useState<User>()

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [input, setInput] = useState('')

  const filterPolls = useMemo(() => {
    if (input.length > 0) {
      const filteredPolls = polls.filter((poll) =>
        poll.title.toLowerCase().includes(input.toLowerCase()),
      )

      return filteredPolls
    }

    return polls
  }, [input, polls])

  useEffect(() => {
    async function loadUserFeed() {
      const { token } = JSON.parse(localStorage.getItem('@token') as string)

      const response = await fetch(`/api/feed?token=${token}`)
      const { user, polls } = await response.json()

      localStorage.setItem('user', JSON.stringify(user))
      setPolls(polls)
      setUser(user)
    }

    loadUserFeed()
  }, [])

  function handlerCreatePollModal(): void {
    setIsCreateModalOpen(true)
  }

  function handlerSearchPollModal(): void {
    setIsSearchModalOpen(true)
  }

  function handlerCreatePoll(poll: FeedPoll): void {
    console.log(poll)
    setPolls((prevPolls) => [...prevPolls, poll])
  }

  return (
    <>
      <HomeHeader />

      <div className="flex mt-4 px-4">
        <UserCard user={user} />

        <main className="flex flex-col w-full px-4">
          <div className="mt-4 flex w-[984px] px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100">
            <input
              className="w-full text-base text-gray-100 bg-transparent outline-none"
              type="text h-full"
              placeholder="Pesquise um Bolão"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button>
              <MagnifyingGlass size={32} color={'#F7DD43'} />
            </button>
          </div>

          <HomeMenu
            handlerCreatePoll={handlerCreatePollModal}
            handlerSearchPoll={handlerSearchPollModal}
          />

          <ul className="mt-4">
            {filterPolls.map((poll) => (
              <PollCard key={poll.code} poll={poll} />
            ))}
          </ul>
        </main>

        <StaticsCard />
      </div>

      <HomeMenuModal
        isOpen={isSearchModalOpen}
        onCloseModal={() => setIsSearchModalOpen(false)}
      >
        <SearchPollComponent />
      </HomeMenuModal>

      <HomeMenuModal
        isOpen={isCreateModalOpen}
        onCloseModal={() => setIsCreateModalOpen(false)}
      >
        <CreatePollComponent
          handlerCloseModal={() => setIsCreateModalOpen(false)}
          createPoll={handlerCreatePoll}
        />
      </HomeMenuModal>
    </>
  )
}
