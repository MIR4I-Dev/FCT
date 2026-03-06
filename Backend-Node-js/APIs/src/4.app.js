const express = require('express');
const movies = require('./movies/movies.json');
const crypto = require('node:crypto');
const z = require('zod');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    // Filtra las películas por filtros si se ha indicado genero y ademas no será case sensitive
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()));
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  return (movie) ? res.json(movie) : res.status(404).json({ message: 'Movie not found' });
});

// Esto no sería REST porque estamos guardando el estado de la aplicación en la memoria
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2027),
  director: z.string(),
  duration: z.number().min(0).max(500),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  gender: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre.'
    }
  )
});

function validateMovie (object) {
  return movieSchema.safeParse(object);
}

module.exports = { validateMovie };

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    res.status(400).json({ error: result.error.message });
  }

  const newMovie = {
    id: crypto.randomUUID(), // UUID random
    ...result.data
  };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
