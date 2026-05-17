import { StandCard } from "./StandCard.jsx";
import { StandCardSkeleton } from "./StandCardSkeleton.jsx";
import { useFilters } from "../hooks/useFilters.jsx";
import { useStands } from "../hooks/useStands.jsx";
import { Pagination } from "./Pagination.jsx";
import { Filters } from './Filters.jsx'

export function CardSection() {
    const { filters } = useFilters();
    const { standsData, loading, error } = useStands(filters);

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <>
            <div className="p-4 mt-28 text-white">
                <Filters />
                <Pagination />

                {standsData.length === 0 && !loading && (
                    <p className="text-yellow-500 text-center">No stands found.</p>
                )}

                <section className="flex flex-wrap gap-4 w-full max-w-7xl mx-auto m-4 p-5 items-center justify-center z-20 min-h-[600px]">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <StandCardSkeleton key={index} />
                        ))
                    ) : (
                        standsData.map((stand) => (
                            <StandCard key={stand.id} stand={stand} />
                        ))
                    )}
                </section>
            </div>
        </>
    );
}