import { FollowMouse } from "./FollowMouse.jsx"

export function Header({ handleClick }) {
    return (
        <header className="flex flex-col items-center gap-4 min-w-dvw justify-center">
            <h1
                className="text-2xl md:text-3xl lg:text-4xl text-center text-balance text-yellow-500 w-[90%] md:w-[60vw] p-3 mx-auto my-4 tracking-wider font-inter">
                JoJo's Bizarre Adventure API<br />JoJoAPI
            </h1>
            <FollowMouse />
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 min-w-[80px] md:w-[15vw] border-yellow-500 rounded-full p-2 md:p-3 tracking-wider font-inter cursor-pointer transition-transform hover:scale-105" onClick={() => handleClick('all')}>All</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 min-w-[80px] md:w-[15vw] border-yellow-500 rounded-full p-2 md:p-3 tracking-wider font-inter cursor-pointer transition-transform hover:scale-105" onClick={() => handleClick('3')}>Part 3</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 min-w-[80px] md:w-[15vw] border-yellow-500 rounded-full p-2 md:p-3 tracking-wider font-inter cursor-pointer transition-transform hover:scale-105" onClick={() => handleClick('4')}>Part 4</button>
                <button className="text-center text-balance bg-black/70 text-yellow-500 border-4 min-w-[80px] md:w-[15vw] border-yellow-500 rounded-full p-2 md:p-3 tracking-wider font-inter cursor-pointer transition-transform hover:scale-105" onClick={() => handleClick('5')}>Part 5</button>
            </div>
        </header>
    )
}