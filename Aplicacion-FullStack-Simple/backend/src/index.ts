/*ts-node-dev es una herramienta de desarrollo para Node.js que permite ejecutar archivos TypeScript directamente (sin precompilación manual) y reinicia automáticamente la aplicación cuando se detectan cambios en los archivos. Combina la ejecución JIT de ts-node con la recarga rápida de node-dev (similar a nodemon), optimizando el flujo de trabajo*/

import express from 'express';
import users from './data/users.ts';

const app = express();

const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.json('Welcome!');
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});