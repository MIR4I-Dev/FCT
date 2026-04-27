import { useState, useRef, useMemo, useCallback } from "react"
import { searchBooks } from "../services/searchBooks.js"

export function useBooks({ sort }) {
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef("")

    const sortedBooks = useMemo(() => {
        if (sort) {
            return [...books].sort((a, b) => a.year - b.year)
        } else {
            return books
        }
    }, [books, sort])

    const getBooks = useCallback(async (searchArg) => {
        if (previousSearch.current === searchArg) return
        if (!searchArg || searchArg.length < 3) {
            setBooks([])
            return
        }

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = searchArg
            const newBooks = await searchBooks({ search: searchArg })
            setBooks(newBooks)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])
    return { books: sortedBooks, getBooks, error, loading }
}