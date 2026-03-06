const express = require('express');
const ditto = require('./pokemon/ditto.json');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
// express.json() es un middleware nativo de express que se encarga de parsear el body de las peticiones que son POST y que tienen content-type application/json
app.use(express.json());

/* MANUALMENTE:

// use significa que se ejecuta para todas las peticiones que lleguen al servidor (GET, POST, PUT, DELETE, etc)
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  // Solo llegan request que son POST y que tienen content-type application/json
  // de lo contrario, se ejecuta el callback de next() y se pasa a la siguiente ruta

  let body = '';

  // Para recibir el body, la request debe escuchar el evento data y la información llega por chunks (por partes) que convierto en string
  req.on('data', chunk => {
    body += chunk.toString();
  });
  // Cuando se termina de recibir el body en string, se ejecuta el callback escuchando el evento end que lo convierte en JSON y envio la respuesta
  req.on('end', () => {
    const data = JSON.parse(body);
    req.body = data;
    next();
  });
});
*/
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
