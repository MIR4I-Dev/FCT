//No funciona con const text = await fs.readFile('./archivo.txt', 'utf-8');
//O cambio a .mjs y import { readFile } from 'node:fs/promises';
//O uso un wrapper en .js, lo de abajo: (async () => {})();

const { readFile } = require('node:fs/promises');

//IIFE (Immediately Invoked Function Expression)
(
    async () => {
        console.log('Leyendo el primer archivo...');
        const data = await readFile('./archivo.txt', 'utf-8');
        console.log('Primera lectura: ', data);

        console.log('-----> Haciendo cosas mientras leo el archivo...');

        console.log('Leyendo el segundo archivo...');
        const data2 = await readFile('./archivo2.txt', 'utf-8');
        console.log('Segunda lectura: ', data2);

        console.log('-----> Terminando cosas');
    }
)();   

//Lo mismo que hacer un init() al final y llamarlo luego

/* async function init(){
    console.log('Leyendo el primer archivo...');
    const data = await readFile('./archivo.txt', 'utf-8');
    console.log('Primera lectura: ', data);

    console.log('-----> Haciendo cosas mientras leo el archivo...');

    console.log('Leyendo el segundo archivo...');
    const data2 = await readFile('./archivo2.txt', 'utf-8');
    console.log('Segunda lectura: ', data2);
}

init();  */