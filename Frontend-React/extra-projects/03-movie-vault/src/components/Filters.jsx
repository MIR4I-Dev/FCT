import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.jsx'

export function Filters() {
    const { filters, setFilters } = useFilters()

    const handleCategoryChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, genre: e.target.value }))
    }

    const handleSearchChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, search: e.target.value }))
    }
    const categoryFilterId = useId()
    const searchFilterId = useId()
    return (

        <section className='flex gap-3 items-center w-[80%] flex-wrap justify-around'>
            <div className='flex gap-2 items-center'>
                <label htmlFor={categoryFilterId}>Categoría:</label>
                <select name="filters" id={categoryFilterId} value={filters.genre} onChange={handleCategoryChange} className='bg-gray-800 text-white border-gray-700 border rounded px-2 py-1'>
                    <option value="all">Todos</option>
                    <option value="Action">Acción</option>
                    <option value="Sci-Fi">Ciencia Ficción</option>
                    <option value="Crime">Crimen</option>
                </select>
            </div>
            <div className='flex gap-2 items-center'>
                <label htmlFor={searchFilterId}>Buscar:</label>
                <input type="text" id={searchFilterId} value={filters.search} onChange={handleSearchChange} className='bg-gray-800 text-white border-gray-700 border rounded px-2 py-1' />
            </div>
        </section>
    )
}