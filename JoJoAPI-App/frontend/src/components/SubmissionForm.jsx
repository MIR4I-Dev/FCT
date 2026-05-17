import { Header } from "./Header.jsx"
import { Footer } from "./Footer.jsx"
import { BlackOverlay } from "./BlackOverlay.jsx"
import { API_URL } from "../config/config.js"
import { useAuth } from "../hooks/useAuth.jsx"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SubmissionForm = () => {
    const { user } = useAuth()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);

        const submission = document.getElementById("name").value;
        if (submission.length < 20 || submission.length > 200) {
            setError("Submission must be between 20 and 200 characters long.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/users/submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    description: submission
                })
            })

            if (response.ok) {
                navigate("/");
            } else {
                const result = await response.json();
                setError(result.error || "An error occurred while submitting your request.");
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <BlackOverlay />
            <Header />
            <main className="flex flex-col items-center justify-center gap-4 p-4 mt-24 mx-auto relative z-10">
                <h1 className='text-4xl font-bold text-yellow-500 text-center'>Send your submission</h1>
                <form className='flex flex-col items-center justify-center gap-4'>
                    <label htmlFor='name' className="text-yellow-500/80 font-semibold text-sm">Type your submission, {user?.username || 'user'}:</label>
                    <textarea id='name' name='name' required minLength={20} maxLength={200} placeholder='Help us better our website, suggest new features, reports bugs, or send us any feedback you have.' className='p-2 border-2 border-yellow-500 rounded-lg w-80 min-w-fit placeholder:text-zinc-500 bg-black/20 text-yellow-500' resize='none' rows={10}></textarea>
                    <button type='submit' onClick={handleSubmit} className='p-2 border-2 bg-yellow-500 rounded-full w-80 min-w-fit text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'>SUBMIT</button>
                    {loading && <p className="text-center text-yellow-500 font-semibold text-sm mt-2 animate-shake">Loading...</p>}
                    {error && <p className="text-center text-red-500 font-semibold text-sm mt-2 animate-shake">{error}</p>}
                </form>
            </main>
            <Footer />
        </>
    )
}