import { useState } from 'react'
import { api } from '../../lib/axios'
import PollTournament, { Tournament } from '../pollTournament'
import SearchComponent from '../searchComponent'
import SearchConfirmationDialog from '../searchConfirmationDialog'

interface SearchTournamentModalProps {
  pollId: string
  onTournamentConfirm: (id: string) => void
}

export function SearchTournamentModal({
  pollId,
  onTournamentConfirm,
}: SearchTournamentModalProps): JSX.Element {
  const [input, setInput] = useState('')
  const [searchedTournaments, setSearchedTournaments] = useState<Tournament[]>()
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null)

  async function handlerSearchTournaments() {
    const { data } = await api.get(`/tournament/search?name=${input}`)
    setSearchedTournaments(data.data)

    setInput('')
  }

  async function handlerJoinTournament() {
    try {
      const { token } = JSON.parse(localStorage.getItem('@token') as string)

      const { data } = await api.patch(
        `/poll/${pollId}/tournament/join`,
        {
          tournamentId: selectedTournament?.id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      alert(`Torneio: ${data.data.tournamentId} associado com sucesso!!`)
      setSelectedTournament(null)
      onTournamentConfirm(data.data.tournamentId)
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  if (selectedTournament) {
    return (
      <SearchConfirmationDialog
        title="Tem certeza que deseja vincular o bolão com torneio:"
        itemDescription={selectedTournament.name}
        confirmButtonPlaceholder="Confirmar"
        onConfirmPress={handlerJoinTournament}
        onCancelPress={() => setSelectedTournament(null)}
      >
        <PollTournament tournament={selectedTournament} />
      </SearchConfirmationDialog>
    )
  }
  return (
    <SearchComponent
      searchTitle="Pesquise um torneio pelo nome"
      searchInput={input}
      handlerSetInput={setInput}
      placeholder="Digite o nome de um torneio para vincular"
      buttonPlaceholder="Buscar Torneio"
      onSearch={handlerSearchTournaments}
    >
      {searchedTournaments?.map((tournament) => (
        <PollTournament
          key={tournament.id}
          tournament={tournament}
          onPress={() => setSelectedTournament(tournament)}
        />
      ))}
    </SearchComponent>
  )
}
