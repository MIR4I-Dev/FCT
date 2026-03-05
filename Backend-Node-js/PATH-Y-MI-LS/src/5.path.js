const path = require('node:path');

// './content/subfolder/algo.js' asi no se definen las rutas

// Barra separadora de carpetas según el SO
console.log(path.sep); 

// Unir rutas con path.join por si en windows o linux cambia
const filePath = path.join('./content', 'subfolder', 'test.txt');
console.log(filePath);

//Consigo de la ruta completa el nombre del archivo. Eliminas la extensión si se la pasas como segundo parámetro
const base = path.basename('/tmp/midu-secret-files/password.txt', '.txt');
console.log(base);

const extension = path.extname('my.super.image.img');
console.log(extension);