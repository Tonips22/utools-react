import { NavLink } from "react-router-dom";
import { FaList, FaUser, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-dark border-r border-white/10 p-6 flex flex-col gap-4">
      <div className="mb-8">
        <a href="/" className="flex items-center gap-3 hoverable hover:scale-105 transition-transform active:scale-95">
          <img src="/logo.webp" alt="Utools Logo" className="w-10 h-10" />
          <h2 className="font-primary text-2xl text-white">Utools</h2>
        </a>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
              isActive
                ? "bg-gradient-to-r from-light-blue via-purple to-pink text-dark font-semibold"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/dashboard/my-posts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
              isActive
                ? "bg-gradient-to-r from-light-blue via-purple to-pink text-dark font-semibold"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaList className="text-lg" />
          <span>My Posts</span>
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
              isActive
                ? "bg-gradient-to-r from-light-blue via-purple to-pink text-dark font-semibold"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <FaUser className="text-lg" />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-xs text-white/50 text-center">
          Dashboard v1.0
        </p>
      </div>
    </aside>
  );
}
