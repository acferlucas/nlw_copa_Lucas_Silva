import { useState, useEffect } from 'react'
import { HomeContent } from '../../components'
import { HomeLayout } from '../../layout/homeLayout'
import { api } from '../../lib/axios'
import { User } from '../api/feed'

export default function HomePage(): JSX.Element {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('@token') as string)
    async function loadUser() {
      const { data } = await api.get('/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })

      setUser(data.user)
    }

    loadUser()
  }, [])

  return (
    <HomeLayout user={user}>
      <HomeContent />
    </HomeLayout>
  )
}
