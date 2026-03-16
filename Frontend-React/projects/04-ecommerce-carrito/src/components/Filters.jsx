import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.jsx'

export function Filters() {
    const { filters, setFilters } = useFilters()
    // const [minPrice, setMinPrice] = useState(filters.minPrice) Estado local que se mantiene en el componente pero lo ideal es solo tener una "fuente de verdad" que es el estado global
    const minPriceId = useId()
    const categoryId = useId()

    // Por eso usaremos filters como fuente de verdad y la única fuente de verdad global
    const handleChangePrice = (event) => {
        // setFilters puede recibir una función que recibe el estado anterior y devuelve el nuevo estado
        // Esto es útil para evitar problemas con el estado asíncrono
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: Number(event.target.value)
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceId}>Precio a partir de: </label>
                <input
                    type="range"
                    id={minPriceId}
                    name="price"
                    min="0"
                    max="1000"
                    step="10"
                    value={filters.minPrice}
                    onChange={handleChangePrice}
                />
                <span>{filters.minPrice}€</span>
            </div>
            <div>
                <label htmlFor={categoryId}>Categoría</label>
                <select id={categoryId} name="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                </select>
            </div>
        </section>
    )
}