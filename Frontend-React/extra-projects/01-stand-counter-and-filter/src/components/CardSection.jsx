import { StandCard } from "./StandCard";

export function CardSection({ STANDS_DATA }) {
    return (
        <section className="flex flex-wrap gap-4 w-full max-w-7xl mx-auto m-4 p-5 items-center justify-center z-10">
            {STANDS_DATA.map((stand) => (
                <StandCard key={stand.id} stand={stand} />
            ))}
        </section>
    )
}