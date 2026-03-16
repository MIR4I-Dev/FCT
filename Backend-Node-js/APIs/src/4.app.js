const express = require('express');
const movies = require('./movies/movies.json');
const crypto = require('node:crypto');
const z = require('zod');
const app = express();
const port = process.env.PORT || 3000;
// En lugar de manejar CORS manualmente podemos hacer esto:
// const cors = require('cors');

app.disable('x-powered-by');

// Para que express pueda leer el body de las peticiones con un middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:3000',
  'http://midu.dev'
];

// app.use(cors()); Pero aquí se pone * en res.header('Access-Control-Allow-Origin', '*');
// para que acepte todas las origenes. Aunque no es recomendado, para usarlo se debe instalar
// el paquete cors con npm install cors. Así configuraría el cors manualmente:
/* app.use(cors({
  origin: (origin, callback) => {
    // Si el origen está en la lista o es el mismo servidor (undefined)
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
})); */

app.use((req, res, next) => {
  const origin = req.header('origin');

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // Cabeceras necesarias para el Preflight
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Si es una petición OPTIONS, respondemos con 200 y cortamos aquí
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next(); // Si no es OPTIONS, seguimos a la ruta real (GET, DELETE, etc.)
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

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required.', // Si falta la llave
    invalid_type_error: 'Movie title must be a string' // Si es un número, p.ej.
  }),
  year: z.number().int().min(1900).max(2027),
  director: z.string(),
  duration: z.number().int().min(0).max(500),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Crime', 'Drama', 'Action', 'Adventure', 'Comedy', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre.'
    }
  )
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = { validateMovie };

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(), // UUID random
    ...result.data
  };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' });
  movies.splice(movieIndex, 1);
  res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);
  if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) });

  const movieIndex = movies.findIndex(movie => movie.id === id);
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' });

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  };
  movies[movieIndex] = updateMovie;
  res.status(200).json(updateMovie);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
