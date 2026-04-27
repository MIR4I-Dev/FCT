export function BooksList({ books, loading, error }) {
    if (loading) return <p className="text-center" data-testid="loading">Cargando...</p>
    if (error) return <p className="text-center text-red-500" data-testid="error">{error}</p>
    if (books.length === 0) return <p className="text-center" data-testid="no-results">No se han encontrado libros</p>

    return (
        <ul className="grid grid-cols-1 gap-4 items-center p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10" data-testid="books-list">
            {books.map((book) => (
                <li key={book.id} className="flex flex-col items-center p-4 border-2 border-gray-300 bg-gray-800 rounded-md gap-2 justify-center w-full h-full">
                    <h2 className="text-lg font-bold text-center">{book.title}</h2>
                    <p className="text-md font-semibold text-center">{book.author}</p>
                    <p className="text-sm text-center">{book.year}</p>
                </li>
            ))}
        </ul>
    )
}