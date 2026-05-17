import { useFilters } from "../hooks/useFilters.jsx";
import { useStands } from "../hooks/useStands.jsx";

export function Pagination() {
    const { filters, changePage } = useFilters();
    const { totalPages } = useStands(filters);
    const currentPage = filters.page;

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8 mb-12 font-inter">
            <button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="px-3 py-2 border-2 border-yellow-500 rounded-lg text-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-500 hover:text-black transition-colors"
            >
                «
            </button>

            {renderPageNumbers().map((page, index) => {
                if (page === '...') {
                    return <span key={`dots-${index}`} className="text-zinc-500 px-2">...</span>;
                }

                return (
                    <button
                        key={`page-${page}`}
                        onClick={() => changePage(page)}
                        className={`w-10 h-10 border-2 rounded-lg font-bold transition-all ${currentPage === page
                            ? "bg-yellow-500 border-yellow-500 text-black scale-105"
                            : "border-zinc-700 text-white hover:border-yellow-500"
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="px-3 py-2 border-2 border-yellow-500 rounded-lg text-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-500 hover:text-black transition-colors"
            >
                »
            </button>
        </div>
    );
}