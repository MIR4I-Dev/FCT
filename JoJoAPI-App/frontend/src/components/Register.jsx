import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { API_URL } from "../config/config.js";
import { BlackOverlay } from "./BlackOverlay.jsx";
import { Header } from "./Header.jsx";

export function Register() {
    const { login, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ username, email, password })
            });

            const result = await res.json();

            if (res.ok) {
                navigate("/users/login");
            } else {
                setError(result.error || "Invalid credentials");
            }
        } catch {
            setError("Connection error with the server");
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
                        REGISTER
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-yellow-500/80 font-semibold text-sm">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full p-3 bg-zinc-900 border-2 border-zinc-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none transition-colors"
                            />
                        </div>

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
                            {loading ? "Loading..." : "Register!"}
                        </button>

                        {error && <p className="text-center text-red-500 font-semibold text-sm mt-2 animate-shake">{error}</p>}
                    </form>

                    <div className="text-center mt-6 text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link to="/users/login" className="text-yellow-500 underline font-semibold hover:text-yellow-400">
                            Log in here!
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}