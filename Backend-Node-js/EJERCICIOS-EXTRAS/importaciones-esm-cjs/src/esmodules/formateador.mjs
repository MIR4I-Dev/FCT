export function capitalizar(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
}

export function agregarMoneda(valor) {
  const valorNumber = parseFloat(valor).toFixed(2);
  return valorNumber + "€";
}
