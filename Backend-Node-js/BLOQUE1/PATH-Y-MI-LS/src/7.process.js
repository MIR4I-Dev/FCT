// process - Informacion relacionada al proceso actual cuando se ejecuta con node fich arg1 arg2 arg3 y se recupera en un arraycon:
// console.log(process.argv);

// Controlar el proceso y su salida:
// process.exit(0); // Todo ok
// process.exit(1); // Error

// Current Working Directory
//console.log('Directorio del proceso', process.cwd());
//console.log('Directorio del archivo', __dirname);

// Escuchar eventos para controlar el proceso:
/* process.on('exit', () => {
    // limpiar los recursos antes de salir
    console.log('Saliendo del proceso...');
}); */

// Variables de entorno

//Se pone PEPITO=algo en la terminal y luego se ejecuta el script con node ... en Linux o Mac
console.log(process.env.PEPITO);
// Para que funcione en windows powershell hay que poner $env:PEPITO='algo' y luego node ...
// Para que funcione en windows cmd hay que poner set PEPITO=algo y luego node ...