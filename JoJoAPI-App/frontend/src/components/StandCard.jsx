import { PART_STYLES } from '../constants.js';

export function StandCard({ stand, index }) {
    const {
        name,
        origin_part: part,
        description,
        power,
        speed,
        range,
        durability,
        precision,
        development_potential: potential,
        image,
        user: master
    } = stand;

    const styles = PART_STYLES[Number(part)];

    return (
        <article
            className={`bg-gradient-to-br ${styles?.gradient} text-text-primary flex flex-col items-center relative h-full w-full max-w-sm mx-auto p-6 border-4 ${styles?.border} rounded-3xl hover:contrast-125 transition-all duration-300 group overflow-hidden justify-between z-10`}>
            <header className="flex flex-col items-center justify-center w-full mb-4 text-center">
                <img src={image}
                    className="size-64 object-cover object-top rounded-lg mask-radial-at-center mask-radial-from-90% mask-radial-to-100%" 
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    decoding="async" alt={name} />
                <h2
                    className={`text-xl cursor-crosshair ${styles?.masterColor} align-center border-2 bg-black/40 ${styles?.border} tracking-wider shadow-2xl rounded-full p-3 group-hover:contrast-125 transition-all duration-300 font-inter mt-5 `}>
                    {name}
                </h2>
                <p className={`${styles?.masterColor} mt-4 font-semibold italic text-center`}>
                    Stand Master - {master}
                </p>
            </header>
            <main className="w-full flex flex-col flex-1 overflow-hidden">
                <p className="text-sm text-text-primary text-center grow min-h-20 max-h-20 overflow-y-auto text-balance pr-2">
                    {description}
                </p>
                <h3 className={`text-center font-bold border-b mt-6 ${styles?.border} ${styles?.masterColor} opacity-50 pb-2 mb-4`}>
                    Stats
                </h3>
                <div className="grid grid-cols-3 grid-rows-3 gap-3 mt-4 mb-8">
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-power/30 cursor-crosshair col-span-2 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-shadow duration-300 relative overflow-clip">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-power block">Destructive Power</span>
                        <span className="absolute bottom-2 right-2 text-color-power text-[10px] md:text-sm">{power}</span>
                    </div>
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-speed/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-shadow duration-300 relative overflow-clip">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-speed block">Speed</span>
                        <span className="absolute bottom-2 right-2 text-color-speed text-[10px] md:text-sm">{speed}</span>
                    </div>
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-range/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-green-500/30 transition-shadow duration-300 relative overflow-clip">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-range block">Range</span>
                        <span className="absolute bottom-2 right-2 text-color-range text-[10px] md:text-sm">{range}</span>
                    </div>
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-durability/30 cursor-crosshair col-span-2 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300 relative overflow-clip">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-durability block">Durability</span>
                        <span className="absolute bottom-2 right-2 text-color-durability text-[10px] md:text-sm">{durability}</span>
                    </div>
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-potential/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300 relative overflow-clip col-span-2">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-potential block">Potential</span>
                        <span className="absolute bottom-2 right-2 text-color-potential text-[10px] md:text-sm">{potential}</span>
                    </div>
                    <div className="bg-black/70 h-12 p-2 rounded-xl border border-color-precision/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-red-500/30 transition-shadow duration-300 relative overflow-clip">
                        <span className="text-[8px] md:text-[10px] uppercase text-color-precision block">Precision</span>
                        <span className="absolute bottom-2 right-2 text-color-precision text-[10px] md:text-sm">{precision}</span>
                    </div>

                </div>
            </main>
            <svg className={`size-12 ${styles?.masterColor} absolute -bottom-2 -right-3 opacity-30 group-hover:scale-105 group-hover:rotate-180 group-hover:opacity-100 transition-all duration-300`}>
                <use href={`/sprite.svg#icon-part${part}`}></use>
            </svg>
        </article>
    )
}