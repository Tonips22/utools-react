import { useEffect } from "react";
import { useAuthStore } from "@store/authStore.ts";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const profile = useAuthStore((state) => state.profile);

    useEffect(() => {
        if (!user || !profile) {
            navigate('/login');
        } else if (profile.role !== 'admin') {
            navigate('/dashboard');
        }
    }, [navigate, user, profile]);

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Bienvenido al panel de administración. Aquí puedes gestionar tu aplicación.</p>
        </div>
    );
}