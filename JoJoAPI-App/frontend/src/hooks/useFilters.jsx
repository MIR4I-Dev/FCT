import { useContext } from "react";
import { FiltersContext } from "../context/filters.jsx"

export function useFilters() {
    const context = useContext(FiltersContext)
    if (context === undefined) {
        throw new Error("useFilters must be used within a FiltersProvider")
    }
    const { filters, changePage, changePart, changeSearch, changeOrder, resetFilters } = context
    return { filters, changePage, changePart, changeSearch, changeOrder, resetFilters };
}
