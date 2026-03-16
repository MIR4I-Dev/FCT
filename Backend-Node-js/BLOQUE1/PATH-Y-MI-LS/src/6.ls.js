// Con callbacks

const fs = require('node:fs');

fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Error al leer el directorio', err);
        process.exit(1);
    }
    files.forEach(file => {
        console.log(file);
    });
});

console.log('-----> Haciendo cosas mientras leo el contenido asíncronamente con callback...');

//Con promesas

const fs2 = require('node:fs/promises');

fs2.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file);
        })
    })
    .catch(err => {
        console.error('Error al leer el directorio', err);
        process.exit(1);
    })

console.log('-----> Haciendo cosas mientras leo el contenido asíncronamente con promesas...');

