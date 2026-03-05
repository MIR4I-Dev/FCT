const fs = require('node:fs'); //A partir de Node 16 se exige node:
const stats = fs.statSync('./archivo.txt'); //Sincrono

console.log(
    stats.isFile(), //Es un archivo
    stats.isDirectory(), //Es un directorio
    stats.isSymbolicLink(), //Es un enlace simbólico
    stats.size, //Tamaño del archivo en bytes
);