import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth.jsx";
import { API_URL } from "../config/config.js";
import { BlackOverlay } from "./BlackOverlay.jsx";
import { Header } from "./Header.jsx";


export function Login() {
    const { login, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();

            if (res.ok) {
                login(result.user);
                navigate("/stands");
            } else {
                setError(result.error || "Invalid credentials");
            }
        } catch {
            setError("Connection error with the server");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/google/callback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ token: credentialResponse.credential })
            });

            const result = await res.json();

            if (res.ok) {
                login(result.user);
                navigate("/stands");
            } else {
                setError(result.error || "Error authenticating with Google");
            }
        } catch {
            setError("Error authenticating with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <BlackOverlay />
            <main className="min-h-screen w-full flex items-center justify-center p-4 pt-32">
                <div className="bg-black/60 border-4 border-yellow-500 p-8 rounded-2xl w-[400px] text-white shadow-[0_0_50px_rgba(234,179,8,0.2)] backdrop-blur-md">
                    <h1 className="text-3xl font-black text-center text-yellow-500 tracking-wider mb-6 font-inter">
                        LOG IN
                    </h1>

                    {!isOnline && (
                        <p className="text-red-500 bg-red-500/10 p-2 rounded-lg text-center animate-pulse">
                            Conexión inestable. Comprueba tu acceso a internet.
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-yellow-500/80 font-semibold text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-yellow-500/80 font-semibold text-sm">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                minLength="6"
                                className="w-full p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 p-3 bg-yellow-500 text-black font-bold rounded-lg cursor-pointer hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-zinc-600 disabled:cursor-not-allowed"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>

                        {error && <p className="text-center text-red-500 font-semibold text-sm mt-2 animate-shake">{error}</p>}
                    </form>

                    <div className="relative flex py-4 items-center">
                        <div className="grow border-t border-zinc-700"></div>
                        <span className="shrink mx-4 text-zinc-400 text-sm">OR</span>
                        <div className="grow border-t border-zinc-700"></div>
                    </div>

                    <div className={`flex justify-center w-full ${!isOnline ? "opacity-50 pointer-events-none" : ""}`}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Failed to login with Google")}
                            theme="dark"
                            shape="pill"
                        />
                    </div>

                    <div className="text-center mt-6 text-sm text-zinc-400">
                        Don't have an account?{" "}
                        <Link to="/users/register" className="text-yellow-500 underline font-semibold hover:text-yellow-400">
                            Register here!
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}