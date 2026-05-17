import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export function ProtectedRoute() {
    const { isLogged, loading } = useAuth();

    if (loading === true) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-yellow-500 font-bold animate-pulse text-xl">Verifying session...</p>
            </div>
        );
    }

    if (!isLogged) {
        return <Navigate to="/users/login" replace />;
    }

    return <Outlet />;
}