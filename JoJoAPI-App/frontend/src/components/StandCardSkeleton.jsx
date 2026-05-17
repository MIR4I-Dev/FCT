export function StandCardSkeleton() {
    return (
        <div className="w-[320px] h-[550px] p-6 border-4 border-zinc-800 bg-black/40 backdrop-blur rounded-3xl flex flex-col justify-between shadow-2xl relative select-none">
            {/* Header del card */}
            <header className="flex flex-col gap-2 relative">
                {/* Imagen del Stand */}
                <div className="w-48 h-48 mx-auto my-4 bg-zinc-800 rounded-full animate-shimmer"></div>
                {/* Nombre del Stand */}
                <div className="h-8 w-44 bg-zinc-800 rounded mt-3 animate-shimmer"></div>
                {/* Nombre del usuario */}
                <div className="h-4 w-20 bg-zinc-800 rounded animate-shimmer"></div>
            </header>

            {/* Grid de Stats */}
            <main className="flex-grow flex flex-col justify-end">
                {/* Descripción del Stand */}
                <div className="h-4 w-20 bg-zinc-800 rounded animate-shimmer"></div>
                <div className="grid grid-cols-3 grid-rows-3 gap-3 mt-4 mb-4">
                    {/* Stat box 1 (col-span-2) */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 col-span-2 flex flex-col justify-between">
                        <div className="h-2 w-16 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                    {/* Stat box 2 */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 flex flex-col justify-between">
                        <div className="h-2 w-10 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                    {/* Stat box 3 */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 flex flex-col justify-between">
                        <div className="h-2 w-10 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                    {/* Stat box 4 (col-span-2) */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 col-span-2 flex flex-col justify-between">
                        <div className="h-2 w-14 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                    {/* Stat box 5 (col-span-2) */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 col-span-2 flex flex-col justify-between">
                        <div className="h-2 w-14 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                    {/* Stat box 6 */}
                    <div className="bg-zinc-900/70 h-12 p-2 rounded-xl border border-zinc-800/40 flex flex-col justify-between">
                        <div className="h-2 w-12 bg-zinc-800 rounded animate-shimmer"></div>
                        <div className="h-4 w-4 bg-zinc-800 rounded self-end mt-1 animate-shimmer"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
