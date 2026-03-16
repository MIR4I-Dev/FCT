import { useState, useRef, useCallback, useMemo } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Usamos el ref para evitar búsquedas duplicadas consecutivas, useRef es un hook que nos permite guardar valores durante TODO el ciclo de vida del componente 
    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        // Si la búsqueda es la misma que la anterior, no hacemos nada
        if (search === previousSearch.current) return

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = search // Actualizamos la referencia
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, []) // El array vacío es correcto porque usamos los argumentos de la función

    // useMemo para obtener el VALOR (el array). No se usa useCallback porque no es una función, es una modificación de un valor
    const sortedMovies = useMemo(() => {
        if (!movies) return []
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])

    // Retornamos el array de películas ya procesado
    return { movies: sortedMovies, loading, getMovies }
}