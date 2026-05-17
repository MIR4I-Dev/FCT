import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    const { user, login, logout, isLogged, loading, setLoading } = context
    return { user, login, logout, isLogged, loading, setLoading }
}