import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true
    },
    {
        userName: 'pheralb',
        name: 'Pablo Hernández',
        isFollowing: false
    },
    {
        userName: 'pedromiquel',
        name: 'Pedro Miquel',
        isFollowing: false
    }
]

export function App() {
    // Los cambios se propagan hacia abajo, incluso si sus props no han cambiado, pheralb se volverá a renderizar aunque en el DOM no se refleje finalmente.

    return (
        <section className='App'>
            {
                users.map(user => (
                    <TwitterFollowCard
                        key={user.userName}
                        isFollowing={user.isFollowing}
                        userName={user.userName}
                    >
                        {user.name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}