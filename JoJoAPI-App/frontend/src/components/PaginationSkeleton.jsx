export function PaginationSkeleton({ count = 4 }) {
    return (
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
            <button className={`w-10 h-10 bg-zinc-800 rounded-full animate-shimmer`}></button>
            {Array.from({ length: count }, (_, i) => (
                <button
                    key={i}
                    className={`w-10 h-10 bg-zinc-800 rounded-full animate-shimmer`}>
                </button>
            ))}
        </div>
    )
}