import { Dispatch, SetStateAction, PropsWithChildren } from 'react'

interface SearchComponentProps {
  onSearch: () => Promise<void>
  searchTitle: string
  searchInput: string
  placeholder?: string
  buttonPlaceholder?: string
  handlerSetInput: Dispatch<SetStateAction<string>>
}

export default function SearchComponent({
  searchTitle,
  searchInput,
  handlerSetInput,
  onSearch,
  placeholder,
  buttonPlaceholder,
  children,
}: PropsWithChildren<SearchComponentProps>): JSX.Element {
  return (
    <>
      <h1 className="mt-16 text-white text-3xl font-bold">{searchTitle}</h1>
      <input
        type="text"
        className=" mt-4 px-6 py-4 rounded bg-gray-800 border-gray-600 text-lg text-gray-100 w-full"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => handlerSetInput(e.target.value)}
      />
      <button
        className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
        type="button"
        onClick={onSearch}
      >
        {buttonPlaceholder}
      </button>
      <ul className="mt-4">{children}</ul>
    </>
  )
}
