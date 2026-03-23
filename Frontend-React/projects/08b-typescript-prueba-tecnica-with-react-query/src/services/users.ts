const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  await delay(300) // Delay forzado de 300ms para simular una petición de red

  return await fetch(`https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })

    .then(res => {
      const currentPage = Number(res.info.page) // Página actual
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1 // Si el cursor es mayor a 3, no hay más páginas

      return {
        users: res.results, // Resultados de la petición
        nextCursor // Siguiente cursor (para la siguiente página)
      }
    })
}
