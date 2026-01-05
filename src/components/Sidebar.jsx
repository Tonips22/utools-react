import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { useAuth } from "@auth/AuthProvider.jsx";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen border-r border-white/10 rounded-tr-xl rounded-br-xl p-6 flex flex-col items-center justify-between" style={{
        background: `
            radial-gradient(ellipse 200% 120% at 20% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 180% 100% at 10% 50%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 170% 90% at 0% 70%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 150% 110% at 30% 40%, rgba(255, 215, 0, 0.08), transparent 40%),
            #00000000
    `,
    }}>
        <a href="/" className="hoverable hover:scale-105 active:scale-95 transition-scale duration-200 ease-in-out">
            <img src="/logo.webp" alt="Utools Logo" className="w-12 h-12" />
        </a>
        
        <nav className="flex flex-col items-center gap-4">
            <NavLink
                to="/dashboard/my-posts"
                className={({ isActive }) => `hoverable flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${ isActive
                        ? "bg-white text-dark font-semibold rounded-full"
                        : "text-white hover:bg-white/10"
                    }`
                }
            >
                <RxDashboard className="text-lg" />
            </NavLink>
        </nav>

        <footer>
            {user && (
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>`hoverable relative block transition-transform rounded-full hover:scale-110 active:scale-95 ${isActive ? "ring-2 ring-offset-2 ring-pink/50 ring-offset-bg" : ""
                }`
                }
            >
                <img
                    src={user.user_metadata.avatar_url || "/user-icon.svg"}
                    alt={user.user_metadata.name || "User"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
            </NavLink>
            )}

        </footer>
    </aside>
  );
}
