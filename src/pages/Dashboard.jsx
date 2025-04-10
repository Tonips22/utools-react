import Header from "@sections/Header.jsx";
import Footer from "@sections/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";


export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación

    if (!user) {
        // Redirigir al login si el usuario no está autenticado
        navigate("/login");
    }

    return (
        <main className=" min-h-screen flex flex-col">
            <Header
                transparent={false}
                absolute={false}
            />
            <section className="grid grid-cols-4 gap-4 p-8">
                aaa
            </section>
            <Footer />
        </main>
    );
}