import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { useAuth } from "@auth/AuthProvider.jsx";
import { CiSearch } from "react-icons/ci";
import Button from "@components/Button.jsx";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen bg-bg border-r border-white/10 rounded-tr-xl rounded-br-xl p-6 flex flex-col items-center justify-between">
        
        <nav className="flex flex-col items-center gap-4">
            <Button
                onClick={() => navigate("/")}
                className={`rounded-full p-2 w-14 h-14 ${
                    location.pathname === "/"
                        ? "bg-white text-dark"
                        : "text-white"
                }`}
            >
                <FaHome className="text-lg" />
            </Button>
            <Button
                onClick={() => navigate("/search")}
                className={`rounded-full p-2 w-14 h-14 ${
                    location.pathname === "/search"
                        ? "bg-white text-dark"
                        : "text-white"
                }`}
            >
                <CiSearch className="text-lg font-bold" />
            </Button>
            <Button
                onClick={() => navigate("/dashboard/my-posts")}
                className={`rounded-full p-2 w-14 h-14 ${
                    location.pathname === "/dashboard/my-posts"
                        ? "bg-white text-dark"
                        : "text-white"
                }`}
            >
                <RxDashboard className="text-lg" />
            </Button>
        </nav>

        <footer>
            {user && (
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>`hoverable relative block transition-transform rounded-full hover:scale-110 active:scale-95 ${isActive ? "ring-2 ring-offset-2 ring-white/50 ring-offset-bg" : ""
                }`
                }
            >
                <img
                    src={user.user_metadata.avatar_url || "/user-icon.svg"}
                    alt={user.user_metadata.name || "User"}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                />
            </NavLink>
            )}

        </footer>
    </aside>
  );
}
