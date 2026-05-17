import { useCallback, useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters.jsx";
import debounce from "just-debounce-it";

export function Filters() {
    const { filters, changeSearch, changePart, changeOrder, resetFilters } = useFilters();

    const isFiltered = filters.part !== 'all' || filters.search !== '' || filters.order !== 'DESC';

    const [localSearch, setLocalSearch] = useState(filters.search);

    useEffect(() => {
        setLocalSearch(filters.search);
    }, [filters.search]);

    const debouncedFilterUpdate = useCallback(
        debounce((value) => {
            changeSearch(value);
        }, 500),
        [changeSearch]
    );

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (newValue.startsWith(' ')) { e.preventDefault(); return; }
        setLocalSearch(newValue);
        debouncedFilterUpdate(newValue);
    };

    return (
        <div className="flex flex-wrap gap-4 items-center w-full max-w-6xl mx-auto m-4 p-3">

            <select
                value={filters.part}
                onChange={(e) => changePart(e.target.value)}
                className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
            >
                <option value="all">All Parts</option>
                <option value="3">Part 3</option>
                <option value="4">Part 4</option>
                <option value="5">Part 5</option>
                <option value="6">Part 6</option>
            </select>

            <input
                type="text"
                value={localSearch}
                onChange={handleInputChange}
                placeholder="Search Stand name... (ex. Star Platinum)"
                className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none grow"
            />

            <select
                value={filters.order}
                onChange={(e) => changeOrder(e.target.value)}
                className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
            >
                <option value="DESC">Most Recent</option>
                <option value="ASC">Oldest</option>
            </select>

            {isFiltered && (
                <button
                    onClick={resetFilters}
                    className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all animate-fade-in"
                >
                    Clear Filters ✕
                </button>
            )}
        </div>
    );
}