import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { moviesRouter } from './routes/routes-movies.js';

const app = express();
app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());
app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

app.use('/movies', moviesRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
