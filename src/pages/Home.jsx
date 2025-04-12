// App.jsx
import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import NavBar from "@components/NavBar.jsx";
import Hero from "@sections/Hero.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import Footer from "@sections/Footer.jsx";
import "@styles/components/ColoredButton.css";
import { getAllPublishedPosts, getSearchedPublishedPosts } from "@lib/db.js";
import "@styles/components/ColoredButton.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [page, setPage] = useState(1);
  // const [categories, setCategories] = useState([]);

  const PAGINATION = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let data = [];
  
        if (searchTerm.trim() === "") {
          data = await getAllPublishedPosts(page, PAGINATION);
        } else {
          data = await getSearchedPublishedPosts(searchTerm, page, PAGINATION);
        }
  
        // Si es página 1, reinicia el array. Si no, añade los nuevos posts.
        setPosts(prev =>
          page === 1 ? data : [...prev, ...data]
        );
  
        // Si se devuelven menos de PAGINATION, ya no hay más
        setHasMore(data.length === PAGINATION);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [page, searchTerm]);


  return (
    <>
      <Header/>
      <NavBar />

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.titulo}
              link={post.enlace}
              image={post.imagen}
              categories={post.post_categories}
            >
              {post.descripcion}
            </Post>
          ))
        ) : (
          <p className="text-lg font-primary-font">No results found</p>
        )}
      </main>

      <div className="flex justify-center mt-8">
        {hasMore && !loading && (
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="coloredButton"
          >
            Load more...
          </button>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
