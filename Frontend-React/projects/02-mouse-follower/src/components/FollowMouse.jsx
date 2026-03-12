import { useState, useEffect } from 'react'

export const FollowMouse = () => {

    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 })

    // No puedes meter un Hook en un if, debe estar en el cuerpo tal y como se muestra aquí

    useEffect(() => {
        console.log('efecto', { enabled })

        const handleMove = (event) => {
            const { clientX, clientY } = event
            console.log('handleMove', { clientX, clientY })
            setPosition({ x: clientX, y: clientY })
        }

        // Necesito este if porque de lo contrario creará más event listeners cada vez que se renderice el componente div, y el componente div se tiene que renderizar en cada movimiento, donde se envian las posiciones al style
        if (enabled) window.addEventListener('pointermove', handleMove)


        // Esto se ejecutará al desrenderizarse el componente o cuando cambie la dependencia enabled antes de ejecutarse el efecto de nuevo. Limpiará el efecto totalmente. 
        return () => {
            window.removeEventListener('pointermove', handleMove)
            setPosition({ x: 0, y: 0 });
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
            }
            <button onClick={() => { setEnabled(!enabled) }}>
                {enabled ? 'Desactivar' : 'Activar'} efecto puntero
            </button>
        </>

    )
}