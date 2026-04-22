export function Header({ handleClick }) {
    return (
        <header>
            <h1
                className="text-2xl md:text-3xl lg:text-4xl text-center text-balance bg-black/70 text-yellow-500 border-4 w-[60vw] border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer">
                JoJo's Bizarre Adventure API<br />JoJoAPI
            </h1>
            <div className="flex justify-center gap-4">
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 w-[20vw] border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer" onClick={() => handleClick('all')}>All</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 w-[20vw] border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer" onClick={() => handleClick('3')}>Part 3</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 w-[20vw] border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer" onClick={() => handleClick('4')}>Part 4</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 w-[20vw] border-yellow-500 rounded-full p-3 mx-auto my-4 tracking-wider font-inter cursor-pointer" onClick={() => handleClick('5')}>Part 5</button>
            </div>
        </header>
    )
}