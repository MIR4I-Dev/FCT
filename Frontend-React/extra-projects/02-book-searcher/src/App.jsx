import { useRef, useState, useEffect, useCallback } from "react"
import { useBooks } from "./hooks/useBooks.js"
import { useSearch } from "./hooks/useSearch.js"
import { BooksList } from "./components/BooksList.jsx"
import debounce from "just-debounce-it"

export function App() {
  const { search, inputError, updateSearch } = useSearch({ initialSearch: "" })
  const [sort, setSort] = useState(false)
  const { books, getBooks, error, loading } = useBooks({ sort })

  const inputRef = useRef()

  const debouncedGetBooks = useCallback(
    debounce(({ search }) => getBooks(search), 500),
    [getBooks]
  )

  useEffect(() => {
    inputRef.current.focus()

    return () => {
      debouncedGetBooks.cancel()
      console.log("Componente desmontado")
    }
  }, [debouncedGetBooks])

  const handleOnChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    if (!inputError) debouncedGetBooks({ search: newSearch })
  }

  const handleSort = useCallback(() => {
    setSort(!sort)
  }, [sort])

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto items-center p-4 justify-center overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-4" data-testid="title">Buscador de Libros</h1>
      <input type="text" className="border-2 border-gray-300 rounded-md px-4 py-2 text-white" data-testid="input-search" ref={inputRef} placeholder="Harry Potter, El Señor de los Anillos, etc..." onChange={handleOnChange} value={search} />
      {inputError && <p className="text-red-500" data-testid="error">{inputError}</p>}

      <div className="flex items-center gap-2 m-2">
        <input className="text-white cursor-pointer" type="checkbox" id="sort" data-testid="sort-checkbox" checked={sort} onChange={handleSort} aria-checked={sort} />
        <label className="text-white cursor-pointer" htmlFor="sort" data-testid="sort-label">Ordenar por año</label>
      </div>

      <BooksList books={books} data-testid="books-list" loading={loading} error={error} />
    </div>
  )
}
