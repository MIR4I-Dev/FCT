import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config/config.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const res = fetch(`${API_URL}/users/me`, { credentials: 'include' });
        res.then(res => {
            if (res.ok) {
                return res.json();
            }
            setUser(null);
        })
            .then(data => setUser(data?.user ?? null))
            .finally(() => setLoading(false));
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => {
        fetch(`${API_URL}/users/logout`, { method: 'POST', credentials: 'include' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLogged: Boolean(user), loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
