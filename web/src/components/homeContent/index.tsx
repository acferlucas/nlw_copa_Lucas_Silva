import { CaretLeft, MagnifyingGlass } from 'phosphor-react'
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
import { Guess, Participant, ParticipantsWrapper } from '..'

export default function HomeContent(): JSX.Element {
  const [polls, setPolls] = useState<FeedPoll[]>([])

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [isRankingActive, setIsRankingActive] = useState(false)
  const [selectedPoll, setSelectedPoll] = useState(false)

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
        <button onClick={() => setSelectedPoll(false)}>
          <CaretLeft size={28} color="#fff" />
        </button>
        <div className="flex w-[984px] px-6 py-4 justify-between items-center border-b border-gray-600">
          <span className="text-white flex flex-col gap-4">
            <h1 className="font-bold text-2xl">Bolão do Rodrigão</h1>
            <p>
              Código: <strong>h1N1ZI</strong>
            </p>
          </span>
          <ParticipantsWrapper
            participants={[
              {
                id: 'clehs222u0002i06x6gp9cvnn',
                user: {
                  avatarUrl:
                    'https://lh3.googleusercontent.com/a/AGNmyxYbWMpqjjVTU44TNZ_2dvrVZGfm-EKwBAHVGB3w=s96-c',
                },
              },
              {
                id: 'clehtz5pv0002i09kujdo6cke',
                user: {
                  avatarUrl:
                    'https://lh3.googleusercontent.com/a/AGNmyxa3h-KN4sbzSI1mYVGYK27Pz-_RkGsmoeYe1On_0-Y=s96-c',
                },
              },
              {
                id: 'cliho3fyl0001i01a38log8o3',
                user: {
                  avatarUrl:
                    'https://lh3.googleusercontent.com/a/AAcHTtehIYTDSBvgHFAkpLdx6t9Ep3p7czUfufmx-TJU=s96-c',
                },
              },
              {
                id: 'cliho9xue0003i0jicj6frzd9',
                user: {
                  avatarUrl:
                    'https://lh3.googleusercontent.com/a/AAcHTtdJAznrwDgvW1xMSGCu_CO22ORB1nksxRv9FC6idjo=s96-c',
                },
              },
            ]}
            participantsCount={4}
          />
        </div>
        <nav className="mt-4">
          <ul className="flex h-14 bg-gray-800 rounded-md p-2">
            <li
              className={`${!isRankingActive && 'bg-gray-600'}
              w-full flex items-center justify-center rounded-md cursor-pointer text-white font-bold text-xl`}
            >
              <button
                className="w-full"
                onClick={() => setIsRankingActive(false)}
              >
                Seus palpites
              </button>
            </li>
            <li
              className={`${isRankingActive && 'bg-gray-600'} 
                w-full flex items-center justify-center rounded-md cursor-pointer text-white font-bold text-xl`}
            >
              <button
                className="w-full"
                onClick={() => setIsRankingActive(true)}
              >
                Ranking do grupo
              </button>
            </li>
          </ul>
        </nav>
        {!isRankingActive && (
          <ul className="h-[640px]  overflow-y-auto">
            <Guess />
            <Guess />
            <Guess />
          </ul>
        )}
        {isRankingActive && (
          <>
            <Participant />
            <Participant />
            <Participant />
            <Participant />
            <Participant />
            <Participant />
          </>
        )}
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
              onPollClicked={() => setSelectedPoll(true)}
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
