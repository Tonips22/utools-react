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
        <>
            <Header/>
            <section>
                <h1>{user.user_metadata.name} aaa</h1>
            </section>
            <Footer />
        </>
    );
}