import { useFilters } from "../hooks/useFilters.jsx"

export function Footer({ filteredMovies }) {
    const { filters } = useFilters()
    return (
        <footer className="text-center text-white-500 text-sm p-4 fixed bottom-2 left-2 right-2 z-10 bg-black rounded-xl w-fit">
            <p>Desarrollado por Elvis con amor ❤️ para FCT</p>
            <p>
                Cantidad de películas: {filteredMovies.length}
            </p>
            <p>
                Filtros aplicados: {JSON.stringify(filters, null, 2)}
            </p>
        </footer>
    )
}