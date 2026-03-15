import './Footer.css'

export function Footer({ filters, setFilters }) {
    return (
        <footer className='footer'>
            <h4>Filtrado por la categoría ⚛️ － <span>{filters.category}</span></h4>
            <h4>Filtrado por el precio mínimo ⚛️ － <span>{filters.minPrice}</span></h4>
            <button onClick={() => setFilters({ category: 'all', minPrice: 0 })}>Limpiar filtros</button>
        </footer>
    )
}