import { PropsWithChildren } from 'react'

interface SearchConfirmationDialogProps {
  title: string
  itemDescription: string
  confirmButtonPlaceholder?: string
  onConfirmPress: () => Promise<void>
  onCancelPress: () => void
}

export default function SearchConfirmationDialog({
  title,
  itemDescription,
  confirmButtonPlaceholder,
  onConfirmPress,
  onCancelPress,
  children,
}: PropsWithChildren<SearchConfirmationDialogProps>): JSX.Element {
  return (
    <div>
      <h1 className="mt-16 text-white text-3xl font-bold">
        {title} <span className="text-yellow-700">{itemDescription}</span> ?
      </h1>
      {children}
      <div className="flex gap-4 mt-4">
        <button
          className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
          type="button"
          onClick={onConfirmPress}
        >
          {confirmButtonPlaceholder}
        </button>
        <button
          className="mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full"
          type="button"
          onClick={onCancelPress}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
