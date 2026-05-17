import { createContext, useState } from "react";
import { INITIAL_FILTERS } from "../constants.js";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const changePage = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };
    const changePart = (newPart) => {
        setFilters(prev => ({ ...prev, part: newPart, page: 1 }));
    };
    const changeSearch = (newSearch) => {
        setFilters(prev => ({ ...prev, search: newSearch, page: 1 }));
    };
    const changeOrder = (newOrder) => {
        setFilters(prev => ({ ...prev, order: newOrder, page: 1 }));
    };
    const resetFilters = () => {
        setFilters(INITIAL_FILTERS);
    };

    return (
        <FiltersContext.Provider value={{
            filters,
            changePage,
            changePart,
            changeSearch,
            changeOrder,
            resetFilters
        }}>
            {children}
        </FiltersContext.Provider>
    );
}