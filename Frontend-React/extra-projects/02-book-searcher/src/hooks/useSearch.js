import { useState } from "react"

export const useSearch = ({ initialSearch }) => {
    const [search, setSearch] = useState(initialSearch)
    const [inputError, setInputError] = useState("")

    const updateSearch = (newSearch) => {

        setSearch(newSearch)

        if (newSearch.startsWith(" ")) {
            setSearch("")
            return
        }

        if (newSearch.length === 0) {
            setInputError("La búsqueda no puede estar vacía")
            return
        }

        if (newSearch.length < 3) {
            setInputError("La búsqueda debe tener al menos 3 caracteres")
            return
        }
        setInputError("")
    }

    return { search, inputError, updateSearch }
}