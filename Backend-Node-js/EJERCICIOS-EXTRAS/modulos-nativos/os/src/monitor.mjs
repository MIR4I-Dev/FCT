import { platform, arch, cpus, totalmem, freemem, uptime } from "node:os";

const memoriaLibre = (freemem() / 2 ** 30).toFixed(2);
const memoriaTotal = (totalmem() / 2 ** 30).toFixed(2);

console.table({
  "Nombre del SO: ": platform(),
  "Arquitectura: ": arch(),
  "CPUs: ": cpus().length,
  "Memoria Total: ": memoriaTotal + " GB",
  "Memoria Libre: ": memoriaLibre + " GB",
  "Horas encendido: ": (uptime() / 3600).toFixed(2),
});

if (memoriaLibre < memoriaTotal * 0.2) {
  console.log("Alerta: Memoria libre inferior al 20%");
}
