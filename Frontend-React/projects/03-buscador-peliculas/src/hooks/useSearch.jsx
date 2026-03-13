import { useEffect, useRef, useState } from "react"

export function useSearch() {
    // FORMA CONTROLADA - mas lento al renderizar en cada cambio pero es más fácil manejar validaciones
    const [error, setError] = useState(null)
    const [search, updateSearch] = useState('')
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            setError('La búsqueda no puede estar vacía')
            return
        }

        if (search.length < 3) {
            setError('La búsqueda debe tener al menos 3 caracteres')
            return
        }

        setError(null)
    }, [search])

    return { search, updateSearch, error }
}