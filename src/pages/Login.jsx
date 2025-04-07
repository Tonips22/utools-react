import { useAuth } from "@auth/AuthProvider.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBg from "@components/AnimatedBg.jsx";
import { FaGoogle, FaGithub, FaTwitch } from "react-icons/fa";

export default function Login() {
    const { user, loginWithProvider } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirigir si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            navigate("/dashboard");  // Redirigir al Dashboard si el usuario está logueado
        }
    }, [user, navigate]);

    const handleLogin = async (provider) => {
        setLoading(true);
        await loginWithProvider(provider);
        setLoading(false);
    };

    return (
        <main className="grid grid-cols-2 h-screen text-white p-8">
            <section className="flex flex-col items-center justify-center p-8 rounded-lg relative">
                <AnimatedBg />
                <h1 className="z-20 text-2xl">Welcome to</h1>
                <a href="/" className="hoverable font-primary-font z-20 text-8xl">Utools</a>
            </section>

            <section className="z-10 flex flex-col items-center justify-center gap-4 p-8">
                <h1 className="font-primary-font text-7xl">Sign In</h1>
                <h2 className="font-bold">Choose a method to sign in.</h2>
                {loading && <p>Loading...</p>} {/* Mensaje de carga */}
                <button onClick={() => handleLogin("google")} disabled={loading} className="hoverable flex items-center justify-start gap-2 bg-white rounded-lg px-4 py-2 text-dark min-w-60 hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">
                    <FaGoogle className="size-5" />
                    <p className="self-center">Continue with Google</p>
                </button>
                <button onClick={() => handleLogin("github")} disabled={loading} className="hoverable flex items-center justify-start gap-2 bg-white rounded-lg px-4 py-2 text-dark min-w-60 hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">
                    <FaGithub className="size-5" />
                    <p className="self-center">Continue with GitHub</p>
                </button>
                <button onClick={() => handleLogin("twitch")} disabled={loading} className="hoverable flex items-center justify-start gap-2 bg-white rounded-lg px-4 py-2 text-dark min-w-60 hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out">
                    <FaTwitch className="size-5" />
                    <p className="self-center">Continue with Twitch</p>
                </button>
            </section>
        </main>
    );
}
