import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart.jsx"
import { Movie } from "./Movie.jsx"
import { Footer } from "./Footer.jsx"

export function Vault() {
    const { cart, removeFromCart, addToCart } = useCart()
    return (
        <main className="flex flex-col justify-center items-center gap-5 w-full p-5">
            <h1 className="text-4xl font-bold">Películas guardadas</h1>
            <Link to="/" className="w-full text-center text-blue-500 underline decoration-blue-500/30 decoration-2 underline-offset-2 py-2 px-4 rounded">Regresar a la página principal</Link>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center w-full">
                {cart.length === 0 ? (
                    <p className="text-4xl font-bold text-center w-dvw">No se han encontrado películas</p>
                ) : (
                    cart.map((movie) => {
                        return (
                            <Movie key={movie.id} movie={movie} addToCart={addToCart} removeFromCart={removeFromCart} inCart={true} quantity={movie.quantity} />
                        )
                    })
                )}
            </section>
            <Footer filteredMovies={cart} />
        </main>
    )
}