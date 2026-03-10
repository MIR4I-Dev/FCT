import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { createClient } from '@libsql/client';

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const db = createClient({
  url: 'libsql://civil-mastermind-mir4i-dev.aws-eu-west-1.turso.io',
  authToken: process.env.DB_TOKEN
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`);

io.on('connection', async (socket) => {
  console.log('a user has connected!');

  // 1. RECUPERACIÓN DE MENSAJES (Al conectar)
  // Si el socket no recuperó la sesión automáticamente, traemos los mensajes de la DB
  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id, content, user FROM messages WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      });

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error('Error recuperando mensajes:', e);
    }
  }

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  });

  // 2. RECEPCIÓN DE MENSAJES NUEVOS
  socket.on('chat message', async (msg) => {
    let result;
    const user = socket.handshake.auth.user ?? 'Anonimato';

    try {
      result = await db.execute({
        sql: 'INSERT INTO messages (content, user) VALUES (:msg, :user)',
        args: { msg, user }
      });
    } catch (error) {
      console.error('Error al insertar:', error);
      return;
    }

    // Emitimos a todos incluyendo el ID generado por Turso
    io.emit('chat message', msg, result.lastInsertRowid.toString(), user);
  });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/cliente/index.html');
});

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
