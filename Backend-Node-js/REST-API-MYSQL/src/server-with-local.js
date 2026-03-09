import { createApp } from './app.js';
import { MovieModel } from './models/local-file-system/models-movie.js';

createApp({ movieModel: MovieModel });
