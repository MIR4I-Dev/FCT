import { Header } from "./Header.jsx"
import { Footer } from "./Footer.jsx"
import { BlackOverlay } from "./BlackOverlay.jsx"
import { useAuth } from "../hooks/useAuth.jsx";
import { Link, useLocation } from "react-router-dom";

export const NotFound = () => {
    const { isLogged, user } = useAuth();
    const location = useLocation();
    const currentURL = location.pathname;

    return (
        <>
            <BlackOverlay />
            <Header />
            <main className="flex flex-col items-center justify-center gap-4 p-4 mt-24 mx-auto relative z-10">
                <h1 className='text-4xl font-bold text-yellow-500 text-center'>NOT GOOD! The URL <span className="bg-yellow-500/50 text-black">'{currentURL}'</span> doesn't exist.</h1>
                <p className="text-xl text-white/80 text-center">You're lost, {isLogged ? user.username : 'my friend'}. Return to the Joestar mansion.</p>
                <Link to="/stands" className="text-yellow-500 underline px-6 py-2">
                    -&gt; Back to Stands
                </Link>
            </main>
            <Footer />
        </>
    )
}