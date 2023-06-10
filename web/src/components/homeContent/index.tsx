import { MagnifyingGlass } from 'phosphor-react'
import { useState, useMemo, useEffect } from 'react'
import { api } from '../../lib/axios'
import { FeedPoll } from '../../pages/api/feed'
import {
  HomeMenuModal,
  SearchPollComponent,
  CreatePollComponent,
} from '../Modal'
import HomeMenu from '../homeMenu'
import Paginated from '../paginate'
import PollCard from '../pollCard'
import { PollDetailsHeader, PollDetailsOptions } from '..'

export default function HomeContent(): JSX.Element {
  const [polls, setPolls] = useState<FeedPoll[]>([])

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [menuOption, setMenuOption] = useState<'poll' | 'ranking'>('poll')
  const [selectedPoll, setSelectedPoll] = useState<FeedPoll | null>(null)

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

  if (selectedPoll) {
    return (
      <main className="flex flex-col px-4 mt-8">
        <PollDetailsHeader
          poll={selectedPoll}
          handlerChangeSelectedPoll={() => setSelectedPoll(null)}
        />
        <nav className="mt-4">
          <ul className="flex h-14 bg-gray-800 rounded-md p-2">
            <li
              className={`${menuOption === 'poll' && 'bg-gray-600'}
              w-full flex items-center justify-center rounded-md cursor-pointer text-white font-bold text-xl`}
            >
              <button className="w-full" onClick={() => setMenuOption('poll')}>
                Seus palpites
              </button>
            </li>
            <li
              className={`${menuOption === 'ranking' && 'bg-gray-600'} 
                w-full flex items-center justify-center rounded-md cursor-pointer text-white font-bold text-xl`}
            >
              <button
                className="w-full"
                onClick={() => setMenuOption('ranking')}
              >
                Ranking do grupo
              </button>
            </li>
          </ul>
        </nav>
        <PollDetailsOptions menuOption={menuOption} pollId={selectedPoll.id} />
      </main>
    )
  }

  return (
    <>
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
            <PollCard
              key={poll.code}
              poll={poll}
              onPollClicked={() => setSelectedPoll(poll)}
            />
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
