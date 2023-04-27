import { MagnifyingGlass, Plus } from 'phosphor-react'

interface HomeMenuProps {
  handlerCreatePoll: () => void
  handlerSearchPoll: () => void
}

export default function HomeMenu({
  handlerCreatePoll,
  handlerSearchPoll,
}: HomeMenuProps): JSX.Element {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="mt-2 flex items-center gap-1"
        onClick={() => handlerCreatePoll()}
      >
        <Plus size={20} color={'#F7DD43'} />
        <h1 className="text-lg text-yellow-500">criar meu bolão</h1>
      </button>
      <button
        type="button"
        className="mt-2 flex items-center gap-1"
        onClick={() => handlerSearchPoll()}
      >
        <MagnifyingGlass size={20} color={'#F7DD43'} />
        <h1 className="text-lg text-yellow-500">Buscar por codigo</h1>
      </button>
    </div>
  )
}
