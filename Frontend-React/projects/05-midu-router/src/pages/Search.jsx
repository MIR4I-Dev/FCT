import { useEffect } from 'react'

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    // routeParams.query es el parámetro dinámico que viene de la ruta /search/:query
    // Recuerda que title es el nombre de la pestaña del navegador
    document.title = `Has buscado ${routeParams.query}`
  }, [routeParams.query]) // Se ejecuta cada vez que cambia routeParams.query

  return (
    <h1>Has buscado {routeParams.query}</h1>
  )
}
