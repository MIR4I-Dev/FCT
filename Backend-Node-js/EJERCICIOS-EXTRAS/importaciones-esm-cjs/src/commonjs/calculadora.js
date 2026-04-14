function precioTotal(precio, impuesto) {
  return precio + (precio * impuesto) / 100;
}

module.exports = { precioTotal };
