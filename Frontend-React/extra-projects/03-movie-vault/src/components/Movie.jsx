import { Link } from "react-router-dom"

export function Movie({ movie, addToCart, removeFromCart, inCart }) {
    return (
        <article className='flex flex-col gap-5 bg-gray-800 rounded-lg w-full p-5 items-center'>
            <img className='w-full h-120 object-cover rounded-lg' src={movie.poster} alt={movie.title} />
            <h3 className='font-bold text-xl'>{movie.title}</h3>
            <div className='flex gap-4'>
                <p>Año: {movie.year}</p>
                <p>Género: {movie.genre}</p>
            </div>
            <div className="w-full flex justify-center gap-4">
                {inCart ? (
                    <button onClick={() => removeFromCart(movie)} className=' cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'>Eliminar de la bóveda</button>
                ) : (
                    <button onClick={() => addToCart(movie)} className=' cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Añadir a la bóveda</button>
                )}
            </div>
            <Link to={`/movie/${movie.id}`} className=' cursor-pointer w-full text-center text-white underline decoration-blue-500/30 decoration-2 underline-offset-2 py-2 px-4 rounded'>
                Ver detalles
            </Link>
        </article>
    )
}