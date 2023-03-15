export default function PollCard(): JSX.Element {
  return (
    <li className='mt-4 w-full h-36 bg-gray-800 p-6 flex items-center justify-between border-b-8 border-yellow-500 rounded-b'>
      <span className='h-16 flex flex-col justify-between'>
        <strong className='text-white text-2xl'>Bolão do Rodrigão</strong>
        <p className='text-white'>Criado por Rodrigo G.</p>
      </span>
      <div className='flex h-16'>
        <span className='w-16 h-16 border rounded-full' />
        <span className='w-16 h-16 border rounded-full' />
        <span className='w-16 h-16 border rounded-full' />
        <span className='w-16 h-16 border rounded-full' />
        <span className='text-white flex items-center justify-center w-16 h-16 border rounded-full'>+38</span>
      </div>
    </li>
  )
}