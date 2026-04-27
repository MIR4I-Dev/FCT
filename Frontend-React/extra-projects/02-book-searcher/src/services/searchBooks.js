export const searchBooks = async ({ search }) => {
    if (!search || search.length < 3) return null
    try {
        const formattedSearch = search.trim().replace(/\s/g, "_")
        const API_URL = `https://openlibrary.org/search.json?title=${formattedSearch}`

        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Error al buscar los libros")

        const data = await response.json()
        const mappedBooks = data.docs?.map(book => {
            return {
                id: book.key,
                title: book.title,
                author: book.author_name?.[0] || "Autor desconocido",
                year: book.first_publish_year || 9999
            }
        })

        return mappedBooks
    } catch {
        throw new Error("Error al buscar los libros")
    }
}