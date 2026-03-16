import './App.css'
import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'

// Es ideal preguntarse si el useEffect puede separarse en un custom hook

export function App() {
    const { fact, getRandomFactAndUpdateState, error: errorFact } = useCatFact()
    const { url, error: errorImage } = useCatImage({ fact })

    const handleClick = async () => {
        getRandomFactAndUpdateState()
    }

    return (
        <main className="app">
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new fact</button>
            <section className="cat">
                {fact && <p>{fact}</p>}
                {url && <img src={url} alt={`Image extracted by using the first word of ${fact}`} />}
                {errorFact && <p>{errorFact}</p>}
                {errorImage && <p>{errorImage}</p>}
            </section>
        </main>
    )
}