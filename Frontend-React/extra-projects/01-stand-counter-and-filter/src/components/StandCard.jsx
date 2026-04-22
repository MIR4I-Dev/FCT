import { PART_STYLES } from '../constants.js';
import { useState } from 'react';

export function StandCard({ stand }) {
    const [level, setLevel] = useState(1);

    const handleClick = () => {
        setLevel(level + 1);
    }

    const { name, part, description, stats, abilities, image, master } = stand;
    const styles = PART_STYLES[part];

    const abilitiesList = abilities.map((ability) => (
        <li key={ability.id}>{ability.name}</li>
    ));

    const handleGetJson = () => {
        navigator.clipboard.writeText(JSON.stringify(stand, null, 2));
        alert('JSON copied to clipboard');
    }

    return (
        <article
            className={`bg-gradient-to-br ${styles.gradient} text-text-primary flex flex-col items-center relative h-full w-full max-w-sm mx-auto p-6 border-4 ${styles.border} rounded-3xl hover:contrast-125 transition-all duration-300 group overflow-hidden justify-between z-10`}>
            <header className="flex flex-col items-center w-full mb-4">
                <img src={image}
                    className="size-64 object-cover mask-radial-at-center mask-radial-from-45% mask-radial-to-70%" loading="lazy"
                    decoding="async" alt={name} />
                <h2
                    className={`text-xl cursor-crosshair ${styles.masterColor} border-2 bg-black/40 ${styles.border} tracking-wider shadow-2xl rounded-full p-3 group-hover:contrast-125 transition-all duration-300 font-inter`}>
                    {name}
                </h2>
                <p className={`${styles.masterColor} my-2 font-semibold italic`}>
                    Stand Master - {master}
                </p>
            </header>
            <main className="w-full flex flex-col flex-1 overflow-hidden">
                <p className="text-sm text-text-primary text-center grow-1 min-h-20 max-h-20 overflow-y-auto text-balance pr-2">
                    {description}
                </p>
                <div className="grid grid-cols-3 grid-rows-3 gap-3 mt-4 mb-8">
                    <div className="bg-black/70 h-20 p-2 rounded-xl border border-color-power/30 cursor-crosshair col-span-2 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-power block">Destructive Power</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-power">{stats.destructivePower}</span>
                    </div>
                    <div className="bg-black/70 p-2 rounded-xl border border-color-speed/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-speed block">Speed</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-speed">{stats.speed}</span>
                    </div>
                    <div className="bg-black/70 p-2 rounded-xl border border-color-range/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-green-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-range block">Range</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-range">{stats.range}</span>
                    </div>
                    <div className="bg-black/70 p-2 rounded-xl border border-color-durability/30 cursor-crosshair col-span-2 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-durability block">Durability</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-durability">{stats.durability}</span>
                    </div>
                    <div className="bg-black/70 p-2 rounded-xl border border-color-precision/30 cursor-crosshair col-span-2 group-hover:shadow-lg group-hover:shadow-red-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-precision block">Precision</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-precision">{stats.precision}</span>
                    </div>
                    <div className="bg-black/70 p-2 rounded-xl border border-color-potential/30 cursor-crosshair group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300 relative">
                        <span className="text-[10px] uppercase text-color-potential block">Development Potential</span>
                        <span className="font-bold absolute bottom-2 right-2 text-color-potential">{stats.developmentPotential}</span>
                    </div>
                </div>
                <h3 className={`text-center font-bold border-b ${styles.border} opacity-50 pb-2 mb-4`}>
                    Abilities
                </h3>
                <ul className={`text-sm space-y-2 text-text-primary list-disc list-inside border-b ${styles.border} opacity-50 pb-4 grow-1 max-h-30 overflow-y-auto text-balance pr-2`}>
                    {abilitiesList}
                </ul>
            </main>
            <footer className="w-full mt-4">
                <button
                    className={`w-full cursor-pointer border-2 ${styles.border} hover:brightness-125 ${styles.masterColor} bg-black/50 font-bold py-2 px-4 rounded-xl transition-all duration-300 mb-4`}
                    onClick={handleClick}>
                    Level {level >= 10 ? `${level} - Requiem` : level}
                </button>
                <button
                    className={`w-full cursor-pointer border-2 ${styles.border} hover:brightness-125 ${styles.masterColor} bg-black/50 font-bold py-2 px-4 rounded-xl transition-all duration-300 mb-4`}
                    onClick={handleGetJson}>
                    Get JSON
                </button>
            </footer>
            <svg className={`size-12 ${styles.masterColor} absolute -bottom-2 -right-3 opacity-30 group-hover:scale-105 group-hover:rotate-180 group-hover:opacity-100 transition-all duration-300`}>
                <use href={`/sprite.svg#icon-part${part}`}></use>
            </svg>
        </article>
    )
}