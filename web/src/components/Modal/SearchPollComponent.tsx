import { useState } from 'react'
import { FeedPoll } from '../../pages/api/feed'
import PollCard from '../pollCard'
import { api } from '../../lib/axios'
import SearchComponent from '../searchComponent'
import SearchConfirmationDialog from '../searchConfirmationDialog'

interface SearchPollComponentProps {
  onJoinPollConfirm: () => void
}

export function SearchPollComponent({
  onJoinPollConfirm,
}: SearchPollComponentProps): JSX.Element {
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

  async function HandleJoinPoll() {
    try {
      await api.post(
        `/poll/join`,
        {
          code: selectedPoll?.code,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )

      alert('joined successfully')
      onJoinPollConfirm()
    } catch (err) {
      alert(err)
    }
  }

  if (selectedPoll) {
    return (
      <SearchConfirmationDialog
        title="Tem certeza que deseja participar do bolão:"
        itemDescription={selectedPoll.code}
        confirmButtonPlaceholder="Participar!"
        onConfirmPress={HandleJoinPoll}
        onCancelPress={() => setSelectedPoll(null)}
      >
        <PollCard poll={selectedPoll} />
      </SearchConfirmationDialog>
    )
  }

  return (
    <SearchComponent
      searchTitle="Encontre um bolão através de seu código único"
      searchInput={input}
      placeholder="Código unico do bolão"
      handlerSetInput={setInput}
      buttonPlaceholder="Buscar bolão"
      onSearch={handlerSearchPoll}
    >
      {searchedpolls?.map((poll) => (
        <PollCard
          key={poll.code}
          poll={poll}
          onPollClicked={() => setSelectedPoll(poll)}
        />
      ))}
    </SearchComponent>
  )
}
