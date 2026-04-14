import { capitalizar, agregarMoneda } from "./formateador.mjs";
import { precioTotal } from "../commonjs/calculadora.js";

const textoTransformado = `Producto: ${capitalizar("ratón")} | Precio: ${agregarMoneda(precioTotal(100, 21))}`;

console.log(textoTransformado);
