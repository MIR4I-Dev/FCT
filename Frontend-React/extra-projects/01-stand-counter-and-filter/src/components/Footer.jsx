export function Footer({ filter, handleClick }) {
    return (
        <footer className="z-10 p-4 w-full flex flex-col items-center justify-center">
            <p className="text-center text-text-primary">Made with ❤️ by MIRAI - Just a prototype for now</p>
            <button onClick={() => handleClick('all')} className="text-center bg-black/70 text-yellow-500 border-4 border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer">Remove all filters</button>
            <p className="text-center text-text-primary">Current filter: {filter === 'all' ? 'All' : `Part ${filter}`}</p>
        </footer>
    )
}