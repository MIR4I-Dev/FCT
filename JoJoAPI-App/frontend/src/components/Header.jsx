import { FollowMouse } from "./FollowMouse.jsx"
import { Link } from "react-router-dom"
import logoImg from "../assets/img/JoJoStats-logo.png"
import { useAuth } from "../hooks/useAuth.jsx"

export function Header() {
    const { user, isLogged, logout, loading } = useAuth();

    return (
        <>
            <header className="fixed top-0 left-0 min-w-dvw z-50 h-fit bg-black/80 align-center backdrop-blur-md border-b-2 border-yellow-500/30">
                <div className="mx-auto h-full px-6 flex justify-between items-center">
                    <div className="flex-1 flex justify-start">
                        {loading ? (
                            <div className="h-9 w-24 bg-zinc-800/60 rounded-full animate-shimmer"></div>
                        ) : isLogged ? (
                            <Link to="/users/submission" className="text-yellow-500 text-xs md:text-sm font-bold underline hover:text-yellow-400 transition-colors">
                                Suggest a change!
                            </Link>
                        ) : (
                            <Link to="/users/login" className="bg-yellow-500 text-black text-xs md:text-sm font-black rounded-full px-3 md:px-4 py-1 md:py-2 max-w-30 md:w-fit text-center hover:bg-yellow-400 hover:scale-105 transition-all">
                                Login
                            </Link>
                        )}
                    </div>

                    <Link to="/stands" className="flex-shrink-0 mx-4 hover:scale-105 transition-transform">
                        <img src={logoImg} alt="JoJoStats" className="h-20 w-auto object-cover" loading="lazy" decoding="async" />
                    </Link>

                    <div className="flex-1 flex justify-end">
                        {loading ? (
                            <div className="h-9 w-24 bg-zinc-800/60 rounded-full animate-shimmer"></div>
                        ) : isLogged ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden lg:block text-zinc-400 text-sm">Hi, {user?.username || 'user'}!</span>
                                <button onClick={logout} className="text-red-500 border-2 border-red-500 text-xs md:text-sm font-bold rounded-full px-2 md:px-4 py-1 md:py-2 hover:bg-red-500 hover:text-white transition-all">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/users/register" className="bg-yellow-500 text-black text-xs md:text-sm font-bold rounded-full px-2 md:px-4 py-1 md:py-2 hover:bg-yellow-400 hover:scale-105 transition-all">
                                Register
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <FollowMouse />
        </>
    )
}
