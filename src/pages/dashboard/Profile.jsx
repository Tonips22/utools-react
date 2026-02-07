import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore.ts";
import { FaEnvelope, FaCalendar, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import Button from "@components/Button.jsx";
import Modal from "@components/Modal.jsx";
import { getUserPostsCount } from "@lib/db.js";

export default function Profile() {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [publishedPostsCount, setPublishedPostsCount] = useState(0);
    const [loadingCount, setLoadingCount] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        // Solo redirigir si ya terminó de cargar y no hay usuario
        if (!loading && !user) {
          navigate("/login");
          return;
        }
        
        if (!user) return; // Esperar a que cargue el usuario
        
        document.title = "Profile | Utools";
        
        // Cargar el conteo de posts publicados
        const fetchPublishedCount = async () => {
            try {
                setLoadingCount(true);
                const count = await getUserPostsCount(user.id, "published");
                setPublishedPostsCount(count);
            } catch (error) {
                console.error("Error al cargar posts publicados:", error);
            } finally {
                setLoadingCount(false);
            }
        };
        
        fetchPublishedCount();
    }, [user, loading, navigate]);

    // Mostrar loading mientras carga
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-white/50">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    const { user_metadata } = user;
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex-1 p-8">
            <h1 className="font-primary text-5xl mb-8">Profile</h1>

            <div className="max-w-2xl">
                {/* Profile Card */}
                <div className="bg-dark border border-white/10 rounded-2xl p-8 mb-6 relative overflow-hidden group hover:border-white/30 transition-all duration-300">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-2xl blur-sm opacity-0 group-hover:opacity-20 -z-10 transition-opacity duration-300"></div>
                    
                    <div className="flex items-start gap-6 mb-6">
                        <div className="relative">
                            <img 
                                src={user_metadata.avatar_url || "/user-icon.svg"} 
                                alt={user_metadata.name || "User"} 
                                className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-light-blue via-purple to-pink rounded-full blur opacity-50 -z-10"></div>
                        </div>
                        
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {user_metadata.name || user_metadata.full_name || "User"}
                            </h2>
                            <div className="flex items-center gap-2 text-white/70 mb-3">
                                <FaEnvelope className="text-sm" />
                                <p className="text-sm">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-2 text-white/70">
                                <FaCalendar className="text-sm" />
                                <p className="text-sm">Member since {joinDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Provider Info */}
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-sm text-white/50 mb-2">Connected with</p>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white capitalize">
                                {user.app_metadata.provider}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                        <h3 className="text-white/60 text-sm mb-2">Published Posts</h3>
                        <div className="flex items-center gap-2">
                            <FaFileAlt className="text-light-blue text-xl" />
                            <p className="text-white text-2xl font-bold">
                                {loadingCount ? "..." : publishedPostsCount}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                        <h3 className="text-white/60 text-sm mb-2">Account ID</h3>
                        <p className="text-white font-mono text-xs break-all">{user.id}</p>
                    </div>
                    
                    <div className="bg-dark border border-white/10 rounded-xl p-6 hover:border-white/30 transition-colors">
                        <h3 className="text-white/60 text-sm mb-2">Last Sign In</h3>
                        <p className="text-white text-sm">
                            {new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-dark border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Account Actions</h3>
                    <Button 
                        onClick={() => setShowLogoutModal(true)}
                        danger={true}
                        className="bg-pink text-dark hover:bg-pink/50 hover:text-dark"
                    >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </div>

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
        </div>
    );
}
