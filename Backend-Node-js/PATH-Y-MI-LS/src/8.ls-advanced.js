const fs = require('node:fs/promises');
const path = require('node:path');
// En la terminal pones node 8.ls-advanced.js y te lista el directorio actual, por eso el ?? '.'
// Si pones node 8.ls-advanced.js y luego una ruta te lista esa ruta
const folder = process.argv[2] ?? '.';

async function readDir(directory){
    let files;
    try{
        files = await fs.readdir(directory);
        return files;
    }catch{
        console.error(`Error al leer el directorio ${directory}`);
        process.exit(1);
    }
}

async function getStats(directory,file){
    const filePath = path.join(directory, file);
    let stats;
    try{
        stats = await fs.stat(filePath);
    }catch{
        console.error(`Error al leer el archivo ${filePath}`);
        process.exit(1);
    }
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : '-';
    const fileSize = stats.size.toString().padStart(10); // Bytes
    const fileModified = stats.mtime.toLocaleString();
    return {fileType,file,fileSize,fileModified};
}

function formatRow(file){
    return `${file.fileType} ${file.file.padEnd(40)} ${file.fileSize} ${file.fileModified}`;
}

async function ls(directory){
    const files = await readDir(directory);
    //Map para obtener la información de cada archivo a la vez, el await no es secuencial 
    const filesPromise = files.map((file) => getStats(directory,file));
    const filesInfo = await Promise.all(filesPromise);
    filesInfo.forEach(file => console.log(formatRow(file)));
}

ls(folder);
