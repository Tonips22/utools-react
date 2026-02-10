import { useAuthStore } from "@store/authStore.ts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiUserFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaUserShield } from "react-icons/fa";
import Modal from "@components/Modal.jsx";
import Button from "@components/Button.jsx";
import Dropdown from "@components/Dropdown.tsx";

export default function Header({ absolute = true }) {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  return (
    <header
      id="header"
      className={`z-20 ${absolute ? "absolute" : "relative"} top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-transparent`}
    >
      {/* <a href="/" className="hoverable hover:scale-110 transition-transform relative active:scale-95">
        <img src="/logo.webp" alt="Utools Logo" className="w-12 h-12 z-10" />
        <img src="/logo.webp" alt="Utools Logo" className=" -z-10 w-12 h-12 blur-md absolute top-0 left-0" />
      </a> */}

      <Link to="/" className="hoverable hover:scale-105 transition-transform duration-200 ease-in-out relative active:scale-95 text-white font-bold text-2xl z-10 font-primary">
        <img src="/utools-logo.png" alt="Utools Logo" className="w-24 h-auto" />
      </Link>



      <nav className="flex items-center gap-4">
        <a
          href="https://github.com/Tonips22/utools-react"
          className="hidden md:flex hoverable items-center gap-2 bg-dark backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 active:scale-95 relative group"
          target="_blank"
          rel="noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" className="fill-[#eab308] stroke-[#eab308] transition-all duration-200"/>
          </svg>
          <span className="text-white text-sm font-medium">Star on GitHub</span>
          <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300"></div>
        </a>

        {user ? (
          <Dropdown
            position="right"
            width="w-56"
            customButton={
              <button
                className="hoverable relative transition-transform duration-200 ease-in-out w-10 h-10 rounded-full hover:scale-105 active:scale-95 cursor-pointer overflow-hidden ring-2 ring-offset-2 ring-offset-bg ring-white/20"
              >
                <img
                  src={user.user_metadata.avatar_url || "/user-icon.svg"}
                  alt="User Avatar"
                  className="rounded-full object-cover w-full h-full "
                />
              </button>
            }
          >
            <div className="rounded-lg py-3 px-3 bg-transparent cursor-default">
              <p className="text-xs text-white/80">Signed in as</p>
              <p className="text-sm text-white truncate">{user.user_metadata.name || user.user_metadata.email}</p>
            </div>

            <hr className="my-2 border-white/10" />

            <Button
              onClick={() => navigate("/dashboard/my-posts")}
              className="w-full text-sm rounded-lg"
            >
              <RxDashboard />
              My Posts
            </Button>
            {profile?.is_admin === true && (
              <Button
                onClick={() => navigate("/dashboard/admin")}
                className="w-full text-sm rounded-lg"
              >
                <FaUserShield />
                Admin
              </Button>
            )}
            <Button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full text-sm rounded-lg"
            >
              <RiUserFill />
              Profile
            </Button>


            <Button
              onClick={() => setShowLogoutModal(true)}
              className="w-full text-sm rounded-lg"
              type="danger"
            >
              <FaSignOutAlt />
              Sign Out
            </Button>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="hoverable flex items-center gap-2 bg-dark backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 active:scale-95 relative group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span className="text-white text-sm font-medium">Sign In</span>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300"></div>
          </Link>
        )}
      </nav>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        danger={true}
      />
    </header>
  );
}
