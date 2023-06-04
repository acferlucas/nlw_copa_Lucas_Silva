import { PropsWithChildren } from 'react'
import { HomeHeader, StaticsCard, UserCard } from '../components'
import { User } from '../pages/api/feed'

interface PropsWithChildrenProps {
  user: User | undefined
}

export function HomeLayout({
  children,
  user,
}: PropsWithChildren<PropsWithChildrenProps>): JSX.Element {
  return (
    <>
      <div className="bg-ignite-900 p-0 m-0 h-screen">
        <HomeHeader />
        <div className="flex">
          <UserCard user={user} />
          {children}
          <StaticsCard />
        </div>
      </div>
    </>
  )
}
