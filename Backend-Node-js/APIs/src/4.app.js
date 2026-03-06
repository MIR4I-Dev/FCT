const express = require('express');
const movies = require('./movies/movies.json');
const crypto = require('node:crypto');
const zod = require('zod');

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

app.post('/movies', (req, res) => {
  // Esto no sería REST porque estamos guardando el estado de la aplicación en la memoria
  const { title, genre, year, director, duration, rate, poster } = req.body;

  if (!title || !genre || !year || !director || !duration || !rate || !poster) {
    res.status(400).json({ message: 'Missing required fields' });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    genre,
    director,
    year,
    duration,
    rate: rate ?? 0,
    poster
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
