import { useAuth } from "@auth/AuthProvider.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBg from "@components/AnimatedBg.jsx";
import Loader from "@components/Loader.jsx";
import Button from "@components/Button.jsx";
import { FaGoogle, FaGithub, FaTwitch } from "react-icons/fa";

export default function Login() {
    const { user, loginWithProvider } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const title = "Login | Utools";
    document.title = title;

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
        <main className="grid grid-cols-1 md:grid-cols-2 h-screen text-white p-8">
            <section className="flex flex-col items-center justify-center p-8 rounded-lg relative">
                <AnimatedBg />
                <h1 className="z-20 text-2xl">Welcome to</h1>
                <a href="/" className="hoverable font-primary z-20 text-8xl">Utools</a>
            </section>

            <section className="z-10 flex flex-col items-center justify-center gap-6 p-8">
                <h1 className="font-primary text-7xl">Sign In</h1>
                <h2 className="font-bold text-white/80">Choose a method to sign in.</h2>
                {loading && <Loader />}
                <Button onClick={() => handleLogin("google")} disabled={loading} className="justify-start text-white min-w-60">
                    <FaGoogle className="size-5" />
                    <p className="self-center">Continue with Google</p>
                </Button>
                <Button onClick={() => handleLogin("github")} disabled={loading} className="justify-start text-white min-w-60">
                    <FaGithub className="size-5" />
                    <p className="self-center">Continue with GitHub</p>
                </Button>
                <Button onClick={() => handleLogin("twitch")} disabled={loading} className="justify-start text-white min-w-60">
                    <FaTwitch className="size-5" />
                    <p className="self-center">Continue with Twitch</p>
                </Button>
            </section>
        </main>
    );
}
