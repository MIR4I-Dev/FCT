import { useState, useEffect } from 'react'

export const FollowMouse = () => {

    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({ x: -1000, y: -1000 })

    // No puedes meter un Hook en un if, debe estar en el cuerpo tal y como se muestra aquí

    const handleClick = () => {
        setEnabled(!enabled)
    }

    useEffect(() => {
        const handleMove = (event) => {
            const { clientX, clientY } = event
            setPosition({ x: clientX, y: clientY })
        }

        // Necesito este if porque de lo contrario creará más event listeners cada vez que se renderice el componente div, y el componente div se tiene que renderizar en cada movimiento, donde se envian las posiciones al style
        if (enabled) window.addEventListener('pointermove', handleMove)


        // Esto se ejecutará al desrenderizarse el componente o cuando cambie la dependencia enabled antes de ejecutarse el efecto de nuevo. Limpiará el efecto totalmente. En este caso cuando se desactive el puntero
        return () => {
            window.removeEventListener('pointermove', handleMove)
            setPosition({ x: -1000, y: -1000 });
        }

    }, [enabled])
    return (
        <>
            {enabled &&
                <div style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #fff',
                    borderRadius: '50%',
                    opacity: 0.8,
                    pointerEvents: 'none',
                    left: -25,
                    top: -25,
                    width: 50,
                    height: 50,
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}></div>
                // Para un efecto de cola ponemos top y left a position.x y position.y respectivamente, si queremos un efecto de foco pues como ya lo tenemos.
            }
            <button onClick={handleClick}>
                {enabled ? 'Desactivar' : 'Activar'} efecto puntero
            </button>
        </>

    )
}