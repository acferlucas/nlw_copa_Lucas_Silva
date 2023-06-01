import Image from 'next/image'
import { useRouter } from 'next/router'
import { GameController, SignOut, UsersThree } from 'phosphor-react'
import { User } from '../../pages/api/feed'

export default function UserCard({
  user,
}: {
  user: User | undefined
}): JSX.Element {
  const { push } = useRouter()

  function handleButtonClick() {
    localStorage.removeItem('@token')
    localStorage.removeItem('@user')
    push('/')
  }

  if (!user) {
    return <h1>carregando...</h1>
  }

  return (
    <aside className="mt-8 mx-4">
      <section className="w-80 h-80 p-4 flex flex-col bg-gray-800 border border-transparent rounded-2xl items-center">
        <div className="">
          <div className="w-32 h-32 flex items-center justify-center rounded-full mx-auto bg-gray-900 border border-gray-700 [&>img]:rounded-full">
            <Image
              width={116}
              height={116}
              src={user.avatarUrl}
              alt="Application logo"
            />
          </div>
          <h1 className="text-center font-bold text-white text-2xl">
            Lucas Silva
          </h1>
        </div>
        <footer className="mt-2">
          <span className="h-10 text-white flex items-center gap-4">
            <UsersThree size={32} /> Participando em:{' '}
            <strong className="text-ignite-500">
              {user?._count.participatingAt}
            </strong>
          </span>
          <span className="h-10 text-white flex items-center gap-4">
            <GameController size={32} />
            Total de Bolões:{' '}
            <strong className="text-ignite-500">{user._count.ownpolls}</strong>
          </span>
          <button
            className="h-10 text-white flex items-center gap-4"
            onClick={handleButtonClick}
          >
            <SignOut size={32} />
            Sair
          </button>
        </footer>
      </section>
    </aside>
  )
}
