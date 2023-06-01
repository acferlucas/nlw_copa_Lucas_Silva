import { useState } from 'react'
import { FeedPoll } from '../../pages/api/feed'
import PollCard from '../pollCard'
import { api } from '../../lib/axios'

export function SearchPollComponent(): JSX.Element {
  const [input, setInput] = useState('')
  const [searchedpolls, setSearchedPolls] = useState<FeedPoll[]>([])
  const [selectedPoll, setSelectedPoll] = useState<FeedPoll | null>(null)

  const { token } = JSON.parse(localStorage.getItem('@token') as string)

  async function handlerSearchPoll() {
    const { data } = await api.get(`/polls/search?code=${input}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    setSearchedPolls(data.data)
  }

  if (selectedPoll) {
    return (
      <div>
        <h1 className="mt-16 text-white text-3xl font-bold">
          Tem certeza que deseja participar do bolão{' '}
          <span className="text-yellow-700">{selectedPoll.code}</span> ?
        </h1>
        <PollCard poll={selectedPoll} />
        <div className="flex gap-4 mt-4">
          <button
            className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
            type="button"
          >
            Participar!
          </button>
          <button
            className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
            type="button"
            onClick={() => {
              setSelectedPoll(null)
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="mt-16 text-white text-3xl font-bold">
        Encontre um bolão através de seu código único
      </h1>
      <input
        type="text"
        className=" mt-4 px-6 py-4 rounded bg-gray-800 border-gray-600 text-lg text-gray-100 w-full"
        placeholder="Codigo unico do bolão"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
        type="button"
        onClick={handlerSearchPoll}
      >
        Buscar Bolão
      </button>
      <ul className="mt-4">
        {searchedpolls?.map((poll) => (
          <PollCard
            key={poll.code}
            poll={poll}
            onPollClicked={() => setSelectedPoll(poll)}
          />
        ))}
      </ul>
    </>
  )
}
