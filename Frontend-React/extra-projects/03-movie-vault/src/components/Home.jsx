import { Movie } from './Movie.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { movies } from '../mocks/movies.json'
import { useFilters } from '../hooks/useFilters.jsx'
import { Filters } from './Filters.jsx'
import { Footer } from './Footer.jsx'
import { useCart } from '../hooks/useCart.jsx'

export function Home() {
    const [moviesData] = useState(movies)
    const { filterMovies } = useFilters()
    const { cart, addToCart, removeFromCart, inCart } = useCart()
    const filteredMovies = filterMovies({ moviesData })

    return (
        <main className='flex flex-col justify-center items-center gap-5 w-full p-5'>
            <div className='flex justify-between w-full flex-wrap flex-1'>
                <h1 className="text-4xl font-bold">Home</h1>
                <Link to="/vault" className='w-24 text-center text-white underline decoration-blue-500/30 decoration-2 underline-offset-2 py-2 px-4 rounded hover:bg-blue-500/30'>{`Vault ${cart.length > 0 ? `(${cart.length})` : ''}`} </Link>
            </div>
            <Filters />
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center w-full'>
                {filteredMovies.length === 0 ? (
                    <p className='text-4xl font-bold text-center w-dvw'>No se han encontrado películas</p>
                ) : (
                    filteredMovies.map((movie) => {
                        return (
                            <Movie key={movie.id} movie={movie} addToCart={addToCart} removeFromCart={removeFromCart} inCart={inCart(movie)} />
                        )
                    })
                )}
            </section>
            <Footer filteredMovies={filteredMovies} />
        </main>
    )
}