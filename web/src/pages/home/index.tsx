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
  Paginated,
} from '../../components'

import { FeedPoll, User } from '../api/feed'
import { api } from '../../lib/axios'

export default function HomePage(): JSX.Element {
  const [polls, setPolls] = useState<FeedPoll[]>([])
  const [user, setUser] = useState<User>()

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const maxPerPage = 4

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
    const { token } = JSON.parse(localStorage.getItem('@token') as string)
    async function loadUser() {
      const { data } = await api.get('/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      setUser(data.user)
    }

    loadUser()
  }, [])

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('@token') as string)
    async function loadFeed() {
      const { data } = await api.get('/poll/feed', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {
          page,
          maxPerPage,
        },
      })

      const { totalItems, polls } = data.feed

      setTotalItems(totalItems)
      setPolls(polls)
    }
    loadFeed()
  }, [page])

  function handlerCreatePollModal(): void {
    setIsCreateModalOpen(true)
  }

  function handlerSearchPollModal(): void {
    setIsSearchModalOpen(true)
  }

  function handlerCreatePoll(): void {
    window.location.reload()
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function handleNextPage() {
    setPage(page + 1)
  }

  function handlerPageClick(page: number) {
    setPage(page)
  }

  return (
    <>
      <HomeHeader />
      <div className="flex">
        <UserCard user={user} />
        <main className="flex flex-col px-4 mt-8 min-h-[814px]">
          <div className="flex w-[984px] px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100">
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
          <Paginated
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handlerPageClick={handlerPageClick}
            page={page}
            totalItems={totalItems}
          />
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
