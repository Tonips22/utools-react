import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider.jsx";
import Post from "@components/Post.jsx";
import Button from "@components/Button.jsx";
import Skeleton from "@components/Skeleton.jsx";
import { getUserPosts } from "@lib/db.js";
import PostForm from "@components/PostForm.jsx";

export default function MyPosts() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeForm, setActiveForm] = useState(false);
    const hasFetched = useRef(false);

    const SKELETON_COUNT = 8;

    useEffect(() => {
        if (!user) {
          navigate("/login");
          return;
        } 
        
        if (!hasFetched.current) {
          hasFetched.current = true;
          fetchPosts(); 
          document.title = "My Posts | Utools";
        }
      }, [user, navigate]);

      useEffect(() => {
        if(activeForm){
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [activeForm]);

      const fetchPosts = async () => {
        if (!user) return;
      
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

      const refreshPosts = async () => {
        if (!user) return;
        try {
          const data = await getUserPosts(user.id);
          setPosts(data);
        } catch (error) {
          console.error("Error refreshing posts:", error);
        }
      }      

    return (
        <div className="flex-1 p-8">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="font-primary text-5xl">My Posts</h1>
                <Button
                    onClick={() => setActiveForm(true)}
                    className="font-semibold text-white"
                >
                    <span>New Post +</span>
                </Button>
            </div>

            <main className="min-h-[60vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <Skeleton key={index} />
                  ))
                ) : posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                      key={post.id}
                      id={post.id}
                      title={post.titulo}
                      link={post.enlace}
                      image={post.imagen}
                      categories={post.post_categories}
                      showStatus={true}
                      status={post.estado}
                      onPostDeleted={refreshPosts}
                      onPostUpdated={refreshPosts}
                    >
                    {post.descripcion}
                    </Post>
                ))
                ) : (
                <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12">
                    <p className="text-2xl font-primary text-white/60">You don't have any posts yet</p>
                    <Button onClick={() => setActiveForm(true)} className="text-white">
                        Create your first post
                    </Button>
                </div>
                )}
            </main>

            {activeForm && (
                <div className="fixed inset-0 z-[990] flex items-center justify-center"
                style={{
                  background: `
                    radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
                    radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
                    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
                    radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
                    #000000
                  `,
                }}>
                  <PostForm
                    isNewPost={true}
                    setActiveForm={setActiveForm}
                    onPostCreated={refreshPosts}
                  />
                </div>
            )}
        </div>
    );
}
