import { useState, useEffect } from 'react'

export const FollowMouse = () => {
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({ x: -1000, y: -1000 });

    const handleClick = () => {
        setEnabled(!enabled);
    }

    useEffect(() => {
        const handleMove = (event) => {
            const { clientX, clientY } = event
            setPosition({ x: clientX, y: clientY })
        }

        if (enabled) window.addEventListener('pointermove', handleMove)

        return () => {
            window.removeEventListener('pointermove', handleMove)
            setPosition({ x: -1000, y: -1000 });
        }
    }, [enabled])
    return (
        <div className="hidden lg:block">
            {enabled &&
                <div className="bg-black/70 border-2 border-yellow-500 rounded-full" style={{
                    position: 'fixed',
                    opacity: 0.8,
                    pointerEvents: 'none',
                    left: 10,
                    top: 10,
                    width: 50,
                    height: 50,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: 1000
                }}></div>
            }
            <button onClick={handleClick} className={`text-center text-balance bg-yellow-500/80 text-black border-4 rounded-full hover:scale-105 fixed top-1/2 right-1 z-100000000`}>
                <svg fill="#000000" width="50px" height="50px" viewBox="-10.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.313 14.906v1.313h1.313v1.313h-3.969v2.656h1.313v2.656h1.344v2.656h-2.656v-2.656h-1.344v-2.656h-1.313v-1.313h-1.344v1.313h-1.313v1.344h-1.344v-14.594h1.344v1.313h1.313v1.344h1.344v1.313h1.313v1.344h1.344v1.313h1.313v1.344h1.344z"></path>
                </svg>
            </button>
        </div>

    )
}