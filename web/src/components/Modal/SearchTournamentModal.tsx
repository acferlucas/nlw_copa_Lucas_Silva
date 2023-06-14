import { useState } from 'react'

export interface Tournament {
  id: string
  name: string
}

export function SearchTournamentModal(): JSX.Element {
  const [input, setInput] = useState('')
  const [searchedTournaments, setSearchedTournaments] = useState<Tournament[]>()

  function handlerSearchTournaments() {
    alert('tournament')
  }
  return (
    <>
      <h1 className="mt-16 text-white text-3xl font-bold">
        Pesquise um torneio pelo nome
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
        onClick={handlerSearchTournaments}
      >
        Buscar Torneio
      </button>
      <ul className="mt-4">
        {searchedTournaments?.map((tournament) => (
          <h1 key={tournament.id}>{tournament.name}</h1>
        ))}
      </ul>
    </>
  )
}
