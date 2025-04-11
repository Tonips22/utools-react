import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import Footer from "@sections/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import { getUserPosts } from "@lib/db.js";


export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
          navigate("/login");
        } else {
          fetchPosts(); // solo si hay user
        }
      }, [user]);
      

      const fetchPosts = async () => {
        if (!user) return; // prevención extra
      
        setLoading(true);
        try {
          const data = await getUserPosts(user.id);
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      }      

    return (
        <main className=" min-h-screen flex flex-col">
            <Header
                transparent={false}
                absolute={false}
            />
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
                {loading ? (
                <Loader />
                ) : posts.length > 0 ? (
                posts.map((post, index) => (
                    <Post
                    key={post.id}
                    title={post.titulo}
                    link={post.enlace}
                    image={post.imagen}
                    categories={post.post_categories}
                    showStatus={true}
                    status={post.estado}
                    >
                    {post.descripcion}
                    </Post>
                ))
                ) : (
                <p className="text-lg font-primary-font">You don't have any posts yet</p>
                )}
            </main>
            <Footer />
        </main>
    );
}