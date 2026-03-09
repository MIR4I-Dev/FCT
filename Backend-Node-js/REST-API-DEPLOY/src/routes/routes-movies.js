import { Router } from 'express';
// import movies from './movies/movies.json'; ESTO NO ES VALIDO EN ESModules
import { MovieController } from '../controllers/controllers-movies.js';

export const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);
moviesRouter.get('/:id', MovieController.getById);
moviesRouter.post('/', MovieController.create);
moviesRouter.delete('/:id', MovieController.delete);
moviesRouter.patch('/:id', MovieController.update);
