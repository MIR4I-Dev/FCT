import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovie.jsx'
import { useSearch } from './hooks/useSearch.jsx'
import { useState } from 'react'
import debounce from 'just-debounce-it'

export function App() {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    /*FORMA NO CONTROLADA
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields)

    // Con fields podría hacer validaciones ya toma TODOS los campos con name. Esta es una forma no controlada de hacerlo (más óptima)
    if (!fields.query) return
    console.log(fields)
    */

  }

  const handleSort = () => {
    setSort(!sort)
  }

  // Esto lo que hará es que no se hagan peticiones a la API hasta que el usuario deje de escribir durante 300ms.
  const debouncedGetMovies = debounce(getMovies, 300) // 300ms es el tiempo que se esperará antes de hacer la petición

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch) // Actualiza el valor del input
    // Sin un debounce, se harían muchas peticiones a la API, lo instalamos con pnpm install just-debounce-it -E
    debouncedGetMovies({ search: newSearch })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas y Series</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{ border: error ? '1px solid red' : '1px solid transparent' }} type="text" value={search} onChange={handleChange} name="query" placeholder="Avengers, Spiderman, Joker, etc." />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>
      <main>
        {loading ? <p style={{ textAlign: 'center' }}>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}