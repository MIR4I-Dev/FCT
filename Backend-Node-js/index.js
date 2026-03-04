//Información del sistema
const os = require('node:os');

console.log('Información del sistema operativo:');
console.log('------------------------------------');
console.log('Nombre del sistema operativo:', os.platform());
console.log('Versión del sistema operativo:', os.release());
console.log('Arquitectura:', os.arch());
console.log('CPUs:', os.cpus()); 
console.log('Memoria total:', os.totalmem() / 2**20 + 'MB');
console.log('Memoria libre:', os.freemem() / 2**20 + 'MB');
