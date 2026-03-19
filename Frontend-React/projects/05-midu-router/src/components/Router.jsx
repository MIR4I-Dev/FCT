import { EVENTS } from '../utils/consts.js'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils/getCurrentPath.js'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route /> components
  // Children.map() es un método de React que permite recorrer los hijos de un componente.
  // En este caso, estamos recorriendo los hijos del componente Router, Route, solo para tomar sus propiedades.
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type // Name es el nombre del componente, en este caso 'Route'
    const isRoute = name === 'Route' // isRoute es true si el componente es Route
    return isRoute ? props : null // Si es Route, devolvemos sus propiedades, si no, devolvemos null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean) // routesToUse es un array que contiene todas las rutas, tanto las que vienen por props como las que vienen por children. filter(Boolean) elimina los valores null y undefined del array.

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true // Si la ruta es igual a la ruta actual, devolvemos true, no es necesario usar path-to-regexp para esto.

    // hemos usado path-to-regexp para poder detectar rutas dinámicas como por ejemplo /search/:query <- :query es una ruta dinámica
    const matcherUrl = match(path, { decode: decodeURIComponent }) // match es una función de path-to-regexp que devuelve una función que se puede usar para detectar rutas dinámicas.
    const matched = matcherUrl(currentPath) // matched es un objeto que contiene la ruta y los parámetros de la url.
    if (!matched) return false // Si la ruta no es igual a la ruta actual, devolvemos false

    // guardar los parámetros de la url que eran dinámicos y que hemos extraído con path-to-regexp
    // por ejemplo, si la ruta es /search/:query
    // y la url es /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params // routeParams es un objeto que contiene los parámetros de la url
    return true // Si la ruta es igual a la ruta actual, devolvemos true
  })?.Component // ?.Component es una forma de acceder a la propiedad Component del objeto Page sin preocuparse porque lo de la izquierda sea undefined

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
