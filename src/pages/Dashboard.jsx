import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";
import Sidebar from "@components/Sidebar.jsx";
import Footer from "@sections/Footer.jsx";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex"
            style={{
              background: `
                radial-gradient(ellipse 180% 120% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 70%),
                radial-gradient(ellipse 160% 100% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 80%),
                radial-gradient(ellipse 150% 110% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 85%),
                radial-gradient(ellipse 170% 80% at 80% 30%, rgba(255, 215, 0, 0.10), transparent 60%),
                #000000
              `,
            }}
        >
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}