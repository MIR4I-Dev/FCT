import { Router } from 'express';
import { MovieController } from '../controllers/controllers-movies.js';

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();
  // Decidimos el modelo que vamos a usar
  const movieController = new MovieController({ movieModel });

  moviesRouter.get('/', movieController.getAll);
  moviesRouter.get('/:id', movieController.getById);
  moviesRouter.post('/', movieController.create);
  moviesRouter.delete('/:id', movieController.delete);
  moviesRouter.patch('/:id', movieController.update);

  return moviesRouter;
};
