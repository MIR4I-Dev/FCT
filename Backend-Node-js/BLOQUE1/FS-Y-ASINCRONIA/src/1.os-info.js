//Información del sistema

//import { platform, release, arch, cpus, totalmem, freemem, uptime } from 'node:os'; para tomar solo algunas funciones con ESModules .mjs
//import os from 'node:os'; para tomar todo el módulo os ESModules

const os = require('node:os'); //Con CommonJS

console.log('Información del sistema operativo:');
console.log('------------------------------------');
console.log('Nombre del sistema operativo:', os.platform());
console.log('Versión del sistema operativo:', os.release());
console.log('Arquitectura:', os.arch());
console.log('CPUs:', os.cpus()); 
console.log('Memoria total:', os.totalmem() / 2**20 + 'MB');
console.log('Memoria libre:', os.freemem() / 2**20 + 'MB');
console.log('Días que lleva encendido su ordenador', (os.uptime() / 60 / 60 / 24).toFixed(0));