import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        genre: 'all',
        search: ''
    })

    const filterMovies = ({ moviesData }) => {
        return moviesData.filter(movie => {
            const matchesGenre = filters.genre === 'all' || movie.genre === filters.genre
            const matchesSearch = movie.title.toLowerCase().includes(filters.search.toLowerCase())
            return matchesGenre && matchesSearch
        })
    }

    return (
        <FiltersContext.Provider value={{ filters, setFilters, filterMovies }}>
            {children}
        </FiltersContext.Provider>
    )
}
