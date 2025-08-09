import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import Footer from "@sections/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import { getUserPosts } from "@lib/db.js";
import PostForm from "@components/PostForm.jsx";
import Skeleton from "@components/Skeleton.jsx";


export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtener el usuario autenticado desde el contexto de autenticación
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeForm, setActiveForm] = useState(false); // para controlar el formulario activo

    const SKELETON_COUNT = 8;

    useEffect(() => {
        if (!user) {
          navigate("/login");
        } else {
          fetchPosts(); // solo si hay user
          const title = (user.user_metadata.name) ? `${user.user_metadata.name}'s Dashboard` : "Dashboard";
          document.title = `${title} | Utools`;
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
            {/* <h1 className="font-primary text-5xl px-8"> {title} </h1> */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
                {loading ? (
                  Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <Skeleton key={index} />
                  ))
                ) : posts.length > 0 ? (
                posts.map((post, index) => (
                    <Post
                      key={post.id}
                      id={post.id}
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
                <p className="text-lg font-primary
  ">You don't have any posts yet</p>
                )}
            </main>

            <button
            onClick={() => setActiveForm(true)}
            className="bg-dark rounded-2xl cursor-pointer self-start px-6 py-3 font-semibold hover:bg-dark/80 transition-colors duration-300 z-[990] group mx-8"
          >
            <span
              className="hoverable text-transparent bg-clip-text 
                        bg-gradient-to-r from-light-blue via-purple to-pink 
                        bg-[length:200%_100%] bg-left 
                        group-hover:bg-right 
                        transition-[background-position] duration-200 ease-in-out"
            >
              New Post +
            </span>
          </button>

            {activeForm && (
                <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[990]">
                  <PostForm
                    isNewPost={true}
                    setActiveForm={setActiveForm}
                  />
                </div>
            )}
            <Footer />
        </main>
    );
}