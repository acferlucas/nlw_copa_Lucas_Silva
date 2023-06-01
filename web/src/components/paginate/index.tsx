import { CaretLeft, CaretRight } from 'phosphor-react'

export interface PaginatedProps {
  totalItems: number
  page: number
  handleNextPage: () => void
  handlePreviousPage: () => void
  handlerPageClick: (page: number) => void
}

export default function Paginated({
  handleNextPage,
  handlePreviousPage,
  handlerPageClick,
  totalItems,
  page,
}: PaginatedProps): JSX.Element {
  const calculatedTotalPages = Math.ceil(totalItems / 4)
  const pagesArray = Array.from(
    { length: calculatedTotalPages },
    (_, index) => index + 1,
  )

  return (
    <div className="flex items-center justify-center mt-auto">
      <button onClick={handlePreviousPage} disabled={page === 1}>
        <CaretLeft size={24} color="#fff" />
      </button>
      <ul className="flex gap-2">
        {pagesArray.map((pageTemplate) => (
          <li
            key={pageTemplate}
            onClick={() => handlerPageClick(pageTemplate)}
            className={`w-4 h-4 p-3 flex items-center justify-center rounded-full text-white border cursor-pointer ${
              page === pageTemplate ? ' bg-ignite-600' : ''
            }`}
          >
            {pageTemplate}
          </li>
        ))}
      </ul>
      <button onClick={handleNextPage} disabled={page === calculatedTotalPages}>
        <CaretRight size={24} color="#fff" />
      </button>
    </div>
  )
}
