import { useState, useEffect } from 'react'

export const FollowMouse = () => {

    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({ x: -1000, y: -1000 })

    // No puedes meter un Hook en un if, debe estar en el cuerpo tal y como se muestra aquí

    const handleClick = () => {
        setEnabled(!enabled)
    }

    useEffect(() => {
        // Puede que no podamos poner un estado en un if, pero puede estar en un useEffect
        const handleMove = (event) => {
            // El evento que recibe el handleMove es el evento que se ejecuta en el window.addEventListener('pointermove', handleMove) que contiene clientx y clienty
            const { clientX, clientY } = event
            setPosition({ x: clientX, y: clientY })
        }

        // Necesito este if porque de lo contrario creará más event listeners cada vez que se renderice el componente div (useEffect se ejecuta cada vez que se renderiza el componente o cuando cambia la dependencia enabled), y el componente div se tiene que renderizar en cada movimiento, donde se envian las posiciones al style
        if (enabled) window.addEventListener('pointermove', handleMove)


        // Esto se ejecutará al desrenderizarse el componente o cuando cambie la dependencia enabled antes de ejecutarse el efecto de nuevo. Limpiará el efecto totalmente. En este caso cuando se desactive el puntero
        return () => {
            window.removeEventListener('pointermove', handleMove)
            setPosition({ x: -1000, y: -1000 });
        }

    }, [enabled])
    return (
        <div className="hidden lg:block">
            {/* Si lo que tenemos a la izquierda es true se renderiza el div, si es false no se renderiza. Un || hace que si lo de la izquierda es false se renderice lo de la derecha. */}
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
            <button onClick={handleClick} className="text-center text-balance bg-black/70 text-yellow-500 border-4 min-w-[120px] md:w-[15vw] border-yellow-500 rounded-full p-2 md:p-3 tracking-wider font-inter cursor-pointer transition-transform hover:scale-105">
                {enabled ? 'Desactivar' : 'Activar'} efecto puntero
            </button>
        </div>

    )
}