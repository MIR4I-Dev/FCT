import { useParams } from "react-router-dom"
import { movies } from '../mocks/movies.json'
import { Link } from "react-router-dom"

export function DetailedMovie() {
    const { id } = useParams()
    const movie = movies.find((movie) => movie.id === id)
    return (
        <main className="flex flex-col gap-5 w-dvh items-center justify-center p-15 mx-auto">
            {movie ? (
                <section className="flex flex-col gap-5 items-center justify-center bg-gray-800 rounded-lg w-2/3 p-5 text-white">
                    <img className="w-full h-80 object-cover rounded-lg" src={movie.poster} alt={movie.title} />
                    <h2 className="font-bold text-4xl">{movie.title}</h2>
                    <p>{movie.description}</p>
                    <div className='flex gap-4'>
                        <p>Año: {movie.year}</p>
                        <p>Género: {movie.genre}</p>
                    </div>
                </section>
            ) : (
                <h1 className='text-4xl font-bold'>Película no encontrada</h1>
            )}
            <Link to="/" className='w-24 text-center text-white underline decoration-blue-500/30 decoration-2 underline-offset-2 py-2 px-4 rounded'>Volver al inicio</Link>
        </main>
    )
}