import mysql from 'mysql2/promise';
import fs from 'node:fs';
import path from 'node:path';

// Esto asegura que encuentre el certificado sin importar desde dónde lances el comando
const caCertPath = path.join(process.cwd(), 'isrgrootx1.pem');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    // Leemos el archivo. Si da error aquí, es que el archivo no está en la raíz.
    ca: fs.readFileSync(caCertPath),
    // Esto es CLAVE: Si TiDB usa un certificado que Node no reconoce,
    // puedes poner esto en false temporalmente para probar,
    // pero lo ideal es tener el .pem correcto.
    rejectUnauthorized: true
  }
};

export const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll ({ genre }) {
    // 1. Si no hay género, consulta simple
    if (!genre) {
      const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
      );
      return movies;
    }

    // 2. Si hay género, consulta con JOIN y Marcador de posición (?)
    const [movies] = await connection.query(
      `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id 
       FROM movie m 
       INNER JOIN movie_genres mg ON m.id = mg.movie_id 
       INNER JOIN genre g ON mg.genre_id = g.id 
       WHERE LOWER(g.name) = ?;`,
      [genre.toLowerCase()] // <-- El valor se pasa aquí de forma segura
    );

    return movies;
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
       FROM movie 
       WHERE id = UUID_TO_BIN(?);`,
      [id] // <-- El valor se pasa aquí de forma segura
    );

    return movies;
  }

  static async create ({ input }) {
    const {
      genre: genres, // Es un array: ['Action', 'Drama']
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input;

    // 1. Generamos el UUID en JS para tenerlo disponible
    const uuid = crypto.randomUUID();

    try {
    // 2. Insertar la película
      await connection.query(
      `INSERT INTO movie (id, title, year, director, duration, poster, rate)
       VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
      [uuid, title, year, director, duration, poster, rate]
      );

      // 3. INSERTAR LOS GÉNEROS (Relación muchos a muchos)
      // Suponiendo que tienes una tabla 'genre' con los nombres y IDs
      for (const genreName of genres) {
        await connection.query(
          `INSERT INTO movie_genres (movie_id, genre_id)
           SELECT UUID_TO_BIN(?), id
           FROM genre
           WHERE LOWER(name) = LOWER(?)
           LIMIT 1;`,
          [uuid, genreName]
        );
      }

      // 4. Devolver el objeto creado
      return {
        id: uuid,
        ...input
      };
    } catch (e) {
      console.error(e);
      throw new Error('Error al crear la película');
    }
  }

  /*  static async delete({id}){
      const movieIndex = movies.findIndex(movie => movie.id === id);
      if (movieIndex === -1) return false;

      movies.splice(movieIndex, 1);
      return true;
  } */

  static async delete ({ id }) {
    try {
      await connection.beginTransaction();
      // Validamos si la peli existe
      const [exists] = await connection.query(
        'SELECT 1 FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      );
      if (exists.length === 0) {
        await connection.rollback();
        return false;
      }

      await connection.query(
        'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)',
        [id]
      );

      await connection.query(
        'DELETE FROM movie WHERE id = UUID_TO_BIN(?)',
        [id]
      );
      connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw new Error('Error al eliminar la película');
    }
  }

  static async update ({ id, input }) {
    // 1. Separamos los géneros del resto de campos de la película
    const { genre, ...movieFields } = input;

    try {
      await connection.beginTransaction();

      // 2. CONSTRUIR LA QUERY DINÁMICA PARA LA PELÍCULA
      // Solo haremos el UPDATE si viene al menos un campo para la tabla movie
      if (Object.keys(movieFields).length > 0) {
        const updateSet = [];
        const updateValues = [];

        // Recorremos los campos que nos llegaron y los preparamos
        for (const [key, value] of Object.entries(movieFields)) {
          if (value !== undefined) {
            updateSet.push(`${key} = ?`);
            updateValues.push(value);
          }
        }

        // Añadimos el ID al final del array de valores para el WHERE
        updateValues.push(id);

        const queryString = `UPDATE movie SET ${updateSet.join(', ')} WHERE id = UUID_TO_BIN(?);`;
        await connection.query(queryString, updateValues);
      } else {
        // Validamos si la peli existe en caso de que SOLO nos envíen géneros a actualizar
        const [exists] = await connection.query(
          'SELECT 1 FROM movie WHERE id = UUID_TO_BIN(?)',
          [id]
        );
        if (exists.length === 0) {
          await connection.rollback();
          return false;
        }
      }

      // 3. ACTUALIZAR LOS GÉNEROS (Solo si vienen en el input)
      if (genre && Array.isArray(genre)) {
        // La forma más limpia de actualizar M:N es borrar las relaciones viejas...
        await connection.query(
          'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)',
          [id]
        );

        // ...y crear las nuevas (usando la consulta segura que vimos en el Create)
        for (const genreName of genre) {
          await connection.query(
            `INSERT INTO movie_genres (movie_id, genre_id)
             SELECT UUID_TO_BIN(?), id FROM genre WHERE LOWER(name) = LOWER(?);`,
            [id, genreName]
          );
        }
      }

      await connection.commit();

      // 4. Devolver la respuesta
      // Lo ideal aquí sería hacer un SELECT para devolver la película actualizada completa,
      // pero para mantener tu estructura, devolvemos el ID y lo que se envió:
      return {
        id,
        ...input
      };
    } catch (e) {
      await connection.rollback();
      console.error('Error al actualizar:', e.message);
      throw new Error('Error al actualizar la película');
    }
  }
}
