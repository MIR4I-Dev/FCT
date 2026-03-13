const API_KEY = '4287ad07'

export const searchMovies = async ({ search }) => {
    if (search === '') return null
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const data = await response.json()
        const movies = data.Search

        // ? - Si lo que hay a mi izquierda es null o undefined, para de ejecutar y devuelve undefined en lugar de lanzar un error
        const mappedMovies = movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))
        return mappedMovies
    } catch {
        throw new Error('Error al buscar películas')
    }
}