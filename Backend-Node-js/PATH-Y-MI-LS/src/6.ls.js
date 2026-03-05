const ls = require('node:fs');

ls.readdir('.', (err, files) => {
    if(err){
        console.error('Error al leer el directorio', err);
        return;
    }
    files.forEach(file => {
        console.log(file);
    });
});

console.log('-----> Haciendo cosas mientras leo el archivo asíncronamente con callback...');

//Con promesas

const ls2 = require('node:fs/promises');

ls2.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file);
        })
    })
    .catch(err => {
        console.error('Error al leer el directorio', err);
    })

console.log('-----> Haciendo cosas mientras leo el archivo asíncronamente con promesas...');

