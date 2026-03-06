const http = require('node:http');
const dittoJSON = require('./pokemon/ditto.json');

const desiredPort = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':{
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(dittoJSON));
          break;
        }
        default:{
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>404 - Esta página no existe</h1>');
          break;
        }
      }
      break;
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = '';
          // Para recibir el body, la request debe escuchar el evento data y la información llega por chunks (por partes) que convierto en string
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          // Cuando se termina de recibir el body en string, se ejecuta el callback escuchando el evento end que lo convierte en JSON y envio la respuesta
          req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' }); // Forma rápida de establecer el header
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:{
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>404 - Esta página no existe</h1>');
          break;
        }
      }
      break;
    default:
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<h1>405 - Método no permitido</h1>');
      break;
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort} - 😎`);
});
