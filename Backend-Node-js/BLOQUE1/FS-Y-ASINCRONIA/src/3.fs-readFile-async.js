const fs = require('node:fs');

//Usa una función de callback para leer el archivo de forma asíncrona. 
//El callback se ejecuta cuando el archivo se ha leído. 
//Los parámetros del callback son (err, data) siendo data el contenido del archivo. 
//Si hay un error, se muestra el error.
//Si no hay error, se muestra el contenido del archivo.
//

console.log('Leyendo el primer archivo...');
const data = fs.readFile('./archivo.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Primera lectura: ', data);
});


console.log('-----> Haciendo cosas mientras leo el archivo...');

console.log('Leyendo el segundo archivo...');
const data2 = fs.readFile('./archivo2.txt', 'utf-8', (err, data2) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Segunda lectura: ', data2);
});
