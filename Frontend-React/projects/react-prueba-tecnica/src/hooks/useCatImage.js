import { useState, useEffect } from 'react'

// Custom Hook: debe empezar con 'use'. Sigue las mismas reglas, solo en el cuerpo del componente. No puede estar en un if y no puede estar en un bucle. Normalmente retorna un objeto con los datos que necesita el componente. A diferencia de los hooks normales aquí si que podemos usar un useEffect y useState.
export function useCatImage({ fact }) {
    const CAT_IMAGE_ENDPOINT = 'https://cataas.com/cat/says/'
    const [url, setUrl] = useState()

    // Para recuperar la imagen cada vez que hay una cita nueva
    useEffect(() => {
        if (!fact) return
        const firstThreeWords = fact.split(' ', 3).join(' ')
        fetch(`${CAT_IMAGE_ENDPOINT}${firstThreeWords}?json=true`)
            .then(res => {
                //TODO: Handle error if !res.ok
                return res.json()
            })
            .then(data => {
                const { url } = data
                setUrl(url)
            })
    }, [fact])

    return { url }
}
