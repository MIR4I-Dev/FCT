const { readFile } = require('node:fs/promises');

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([data, data2]) => {
        console.log('Primera lectura: ', data);
        console.log('Segunda lectura: ', data2);
}).catch((err) => {
        console.error(err);
});

console.log('-----> Haciendo cosas mientras leo el archivo...');

console.log('-----> Terminando cosas');
