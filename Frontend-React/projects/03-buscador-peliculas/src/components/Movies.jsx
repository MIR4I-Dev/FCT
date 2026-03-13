function MovieList({ movies }) {
    return (
        <ul className="movies">
            {movies.map((movie) => (
                <li className="movie" key={movie.id}>
                    <img src={movie.image} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                </li>
            ))}
        </ul>
    )
}

function NoMovieList() {
    return (
        <p style={{ textAlign: 'center' }}>No se han encontrado películas o series</p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies && movies.length > 0;
    return (
        <div>
            {hasMovies ? <MovieList movies={movies} /> : <NoMovieList />}
        </div>
    )
}