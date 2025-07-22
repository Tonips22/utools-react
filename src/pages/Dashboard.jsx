import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import Footer from "@sections/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import { getUserPosts } from "@lib/db.js";
import { CiEdit } from "react-icons/ci";
import PostForm from "@components/PostForm.jsx"; // Import the PostForm component


export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeForm, setActiveForm] = useState(false); // para controlar el formulario activo

    useEffect(() => {
        if (!user) {
          navigate("/login");
        } else {
          fetchPosts(); // solo si hay user
        }
      }, [user]);

      if(activeForm){
        const body = document.querySelector("body");
        body.style.overflow = "hidden"; // prevenir scroll cuando el formulario está activo
      } else {
        const body = document.querySelector("body");
        body.style.overflow = "auto"; // permitir scroll cuando el formulario no está activo
      }

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

            <button className="flex items-center rounded-full bg-pink text-dark px-4 py-2 self-start hover:opacity-80 transition-opacity duration-200 ease-in-out z-[999] mx-8" onClick={() => setActiveForm(true)}>
                New Post +
            </button>

            {activeForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[990]">
                  <PostForm
                    isNewPost={true}
                    activeForm={activeForm}
                    setActiveForm={setActiveForm}
                  />
                </div>
            )}
            <Footer />
        </main>
    );
}