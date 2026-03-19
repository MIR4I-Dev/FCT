/* El componente Route que devuelve null es un contenedor de propiedades.
Su path es la llave.
Su Component es el valor.
Es una forma de decirle al sistema: "Aquí tienes esta información guardada en formato de componente para que el Router la use cuando la necesite". */

export function Route ({ path, Component }) {
  return null
}
