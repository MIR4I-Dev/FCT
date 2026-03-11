import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        userName: 'pheralb',
        name: 'Pablo Hernández',
        isFollowing: false,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        userName: 'pedromiquel',
        name: 'Pedro Miquel',
        isFollowing: false,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
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
                        avatar={user.avatar}
                    >
                        {user.name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}