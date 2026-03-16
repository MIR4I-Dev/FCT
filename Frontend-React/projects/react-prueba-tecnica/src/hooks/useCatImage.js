import { useState, useEffect } from 'react'

// Custom Hook: debe empezar con 'use'. Sigue las mismas reglas, solo en el cuerpo del componente. No puede estar en un if y no puede estar en un bucle. Normalmente retorna un objeto con los datos que necesita el componente. A diferencia de los hooks normales aquí si que podemos usar más hooks como useEffect y useState.
export function useCatImage({ fact }) {
    const CAT_IMAGE_ENDPOINT = 'https://cataas.com/cat/says/'
    const [url, setUrl] = useState()
    const [error, setError] = useState(null)

    // Para recuperar la imagen cada vez que hay una cita nueva
    useEffect(() => {
        if (!fact) return
        // El controller es para cancelar la petición si el componente se desmonta y no saturar.
        const controller = new AbortController()
        const firstThreeWords = fact.split(' ', 3).join(' ')
        fetch(`${CAT_IMAGE_ENDPOINT}${firstThreeWords}?json=true`, { signal: controller.signal })
            .then(res => {
                if (!res.ok) {
                    setError("Error al obtener la imagen")
                    return
                }
                return res.json()
            })
            .then(data => {
                const { url } = data
                setUrl(url)
            })
            .catch(err => {
                if (err.name === 'AbortError') return
                setError(err.message)
            })
        return () => controller.abort()
    }, [fact])

    return { url, error }
}
