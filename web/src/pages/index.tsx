import Image from 'next/image'
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png'
import LogoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/avatares.png'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

import { CountCard } from '../components'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home({ poolCount, guessCount, userCount }:HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  
  async function handleCreatePool(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.post('pools', {
        title: poolTitle,
      })
      
      await navigator.clipboard.writeText(data.code)
      
      alert(`Bolão ${data.code} criado com sucesso!!`)
      setPoolTitle('');
    }catch(err:any) {
      console.log(err.response.data[0])
      alert('Falha ao criar bolão')
    }
    
    
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
     <main>
     <Image src={LogoImg} alt="Application logo" />
     <h1 className='mt-14 text-white text-5xl font-bold leading-tight' >Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
     
     <div className='mt-10 flex items-center gap-2'>
      <Image src={usersAvatarExampleImg} alt="avatar imgs" />
      <strong className='text-gray-100 text-xl'>
        <span className='text-ignite-500'>+{userCount}</span> Pessoas já estão usando
      </strong>
     </div>
     
     <form  onSubmit={handleCreatePool} className='mt-10 flex gap-2'>
      <input
        className='flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100' 
        type="text"
        onChange={e => setPoolTitle(e.target.value)}
        value={poolTitle} 
        required 
        placeholder='Qual nome do seu bolão ?'
        
        />
      <button  
        className='px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' 
        type='submit'>Criar meu bolão</button>
     </form>
    
    <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
    
    <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
      <CountCard count={poolCount} isPool/>
      <div className='w-px h-14 bg-gray-600'></div>
      <CountCard count={guessCount} />
    </div>
     </main>
     <Image src={appPreviewImg} alt="two phones showing a preview of nlw application" />
    </div>
  )
}

export async function getStaticProps() {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.guesses,
      userCount: userCountResponse.data.users
    }, // will be passed to the page component as props
  }
}

