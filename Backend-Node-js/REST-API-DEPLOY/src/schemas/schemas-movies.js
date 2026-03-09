import { z } from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2027),
  director: z.string(),
  duration: z.number().int().min(0).max(500),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Crime', 'Drama', 'Action', 'Adventure', 'Comedy', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      invalid_type_error: 'Movie genre must be an array of enum Genre.',
      required_error: 'Movie genre is required.'
    }
  )
});

// Funciones de validación
export function validateMovie (object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input);
}
