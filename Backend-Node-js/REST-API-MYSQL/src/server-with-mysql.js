import { createApp } from './app.js';
import { MovieModel } from './models/mysql/mysql-movie.js';

createApp({ movieModel: MovieModel });
