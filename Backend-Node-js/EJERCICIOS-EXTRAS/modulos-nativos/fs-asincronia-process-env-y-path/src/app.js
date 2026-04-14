const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.env.FOLDER || process.cwd();
const extension = process.env.LOG_EXTENSION || ".log";

(async () => {
  try {
    const files = await fs.readdir(folder);
    const filesWithExtension = files.filter(
      (file) => path.extname(file) === extension,
    );

    if (filesWithExtension.length === 0) {
      console.error("Error: No hay archivos con extensión", extension);
      process.exit(1);
    }

    // 1. Creamos un array de promesas usando .map()
    // Ojo: .map() devuelve un array, no espera a los awaits.
    const promesasDeProcesado = filesWithExtension.map(async (file) => {
      const filePath = path.join(folder, file);
      const text = await fs.readFile(filePath, "utf-8");

      if (text.includes("ERROR")) {
        const urgenteDir = path.join(folder, "urgente");
        await fs.mkdir(urgenteDir, { recursive: true });
        await fs.writeFile(path.join(urgenteDir, file), text);
        return { file, status: "Movido a urgente" };
      }
      return { file, status: "OK" };
    });

    // 2. Ejecutamos todas las promesas en paralelo y esperamos a que TODAS terminen
    const resultados = await Promise.all(promesasDeProcesado);

    console.table(resultados);
    console.log("--- Todas las operaciones paralelas completadas ---");
  } catch (err) {
    console.error("Fallo en el procesado paralelo:", err.message);
    process.exit(1);
  }
})();
