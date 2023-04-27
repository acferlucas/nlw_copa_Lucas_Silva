export function SearchPollComponent():JSX.Element {
  return (
    <>
      <h1 className='mt-16 text-white text-3xl font-bold'>Encontre um bolão através de seu código único</h1>
       <input 
        type="text" 
        className=' mt-4 px-6 py-4 rounded bg-gray-800 border-gray-600 text-lg text-gray-100 w-full' 
        placeholder='Codigo unico do bolão'
        />
        <button  
          className='mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full' 
          type='button'>Buscar Bolão
        </button>
        <span className='flex mt-4 text-white leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </span> 
    </>
  )
}