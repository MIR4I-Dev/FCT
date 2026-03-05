const fs = require('node:fs/promises');
// const { promisify } = require('node:util'); // Esta es otra forma de hacerlo
// const readFilePromisified = promisify(fs.readFile); y uso esto igual que fs.readFile
// Solo se usa si es un node.js sin promesas


// Este código utiliza la API de promesas de Node.js para realizar operaciones de lectura de archivos.
// Esto permite un comportamiento asíncrono y no bloqueante, lo que significa que el hilo principal
// puede continuar ejecutando otras tareas mientras se espera a que el sistema de archivos responda.

console.log('Leyendo el primer archivo...');

// Se utiliza la función readFile de la API de promesas de Node.js para leer el archivo de forma asíncrona.
// El método readFile devuelve una promesa que se resuelve con el contenido retornado por la función readFile (data) y se imprime.
// Si hay un error, la promesa se rechaza con el error (err).
const data = fs.readFile('./archivo.txt', 'utf-8')
    .then((data) => {
        console.log('Primera lectura: ', data);
    })
    .catch((err) => {
        console.error(err);
    });


console.log('-----> Haciendo cosas mientras leo el archivo...');

console.log('Leyendo el segundo archivo...');
const data2 = fs.readFile('./archivo2.txt', 'utf-8')
    .then((data2) => {
        console.log('Segunda lectura: ', data2);
    })
    .catch((err) => {
        console.error(err);
    });
