import { useState } from 'react'
import { api } from '../../lib/axios'
import { FeedPoll } from '../../pages/api/feed'

interface CreatePollComponentProps {
  handlerCloseModal: () => void
  createPoll: () => void
}

export function CreatePollComponent({
  handlerCloseModal,
  createPoll,
}: CreatePollComponentProps): JSX.Element {
  const [title, setTitle] = useState('')

  async function handlerCreatePoll() {
    try {
      const { token } = JSON.parse(localStorage.getItem('@token') as string)

      const { data } = await api.post<FeedPoll>(
        '/poll',
        {
          title,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )

      window.alert(`Bolão ${data.code} Criado com sucesso!!!`)

      createPoll()
      handlerCloseModal()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className="mt-16 text-white text-3xl font-bold">
        Crie seu próprio bolão da copa e compartilhe entre amigos!
      </h1>
      <input
        type="text"
        className=" mt-4 px-6 py-4 rounded bg-gray-800 border-gray-600 text-lg text-gray-100 w-full"
        placeholder="Qual nome do seu bolão"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
        type="button"
        onClick={handlerCreatePoll}
      >
        Criar meu bolão
      </button>
      <span className="flex mt-4 text-white leading-relaxed">
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar outras pessoas.
      </span>
    </>
  )
}
