const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // El navegador hace una petición GET y luego otra GET para el favicon
  // En la terminal con curl no sale el favicon
  if (req.url === '/') {
    res.end('<h1>Esta será la página de inicio</h1>');
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>');
  } else if (req.url === '/zam.webp') {
    fs.readFile('../img/zam.webp', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>500 - Internal Server Error</h1>');
      } else {
        res.setHeader('Content-Type', 'image/webp');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404; // Not Found
    res.end('<h1>404 - Esta página no existe</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort} - 😎`);
});
