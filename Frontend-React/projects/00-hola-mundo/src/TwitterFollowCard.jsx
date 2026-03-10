import { useState } from 'react'; // Hook (utilidades de Reacts)

export function TwitterFollowCard({ children, userName = 'unknown', isFollowing }) {
    const [initialIsFollowing, setIsFollowing] = useState(isFollowing); //useState devuelve el booleano y lo que me permite cambiarlo, ponemos el estado por defecto en useState
    const handleClick = () => {
        setIsFollowing(!initialIsFollowing);
    }
    //React reacciona al cambio de estado y actualiza

    // Children es lo que envuelva a TwitterFollowCard cuando se llame, el interior. Usado para cuando quieres un campo muy extensible. Pudiendo tener hasta subcomponentes
    const buttonClassName = initialIsFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'
    const text = initialIsFollowing ? 'Siguiendo' : 'Seguir'
    // Las props deben ser inmutables, no se modifican directamente, solo se guardan en constantes que ahí pueden variar.
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    alt={`El avatar de ${userName}`}
                    src={`https://unavatar.io/${userName}`}
                />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                </button>
            </aside>
        </article>
    )
}