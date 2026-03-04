//Información del sistema

//import { platform, release, arch, cpus, totalmem, freemem, uptime } from 'node:os'; para tomar solo algunas funciones con ESModules .mjs
//import os from 'node:os'; para tomar todo el módulo os ESModules

const os = require('node:os'); //Con CommonJS

console.log('Información del sistema operativo:');
console.log('------------------------------------');
console.log('Nombre del sistema operativo:', platform());
console.log('Versión del sistema operativo:', release());
console.log('Arquitectura:', arch());
console.log('CPUs:', cpus()); 
console.log('Memoria total:', totalmem() / 2**20 + 'MB');
console.log('Memoria libre:', freemem() / 2**20 + 'MB');
console.log('Días que lleva encendido su ordenador', (uptime() / 3600 /24).toFixed(0));