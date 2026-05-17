import { useContext } from "react";
import { FiltersContext } from "../context/filters.jsx";
import { useStands } from "../hooks/useStands.jsx";

export function Pagination() {
    const { filters, changePage } = useContext(FiltersContext);
    const { page: currentPage } = filters;

    const { nextPage, prevPage, totalPages } = useStands(filters);

    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
            <button
                onClick={() => prevPage && changePage(prevPage)}
                disabled={!prevPage}
                className={`px-3 py-2 border-2 border-yellow-500 rounded-lg text-yellow-500 font-bold transition-all
                    ${!prevPage
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-yellow-500 hover:text-black active:scale-95"}`}
            >
                &laquo;
            </button>

            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => changePage(pageNumber)}
                    className={`w-10 h-10 border-2 rounded-lg font-bold transition-all active:scale-95
                        ${currentPage === pageNumber
                            ? "bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                            : "border-zinc-700 text-zinc-400 hover:border-yellow-500 hover:text-yellow-500"}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => nextPage && changePage(nextPage)}
                disabled={!nextPage}
                className={`px-3 py-2 border-2 border-yellow-500 rounded-lg text-yellow-500 font-bold transition-all
                    ${!nextPage
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-yellow-500 hover:text-black active:scale-95"}`}
            >
                &raquo;
            </button>

        </div>
    );
}