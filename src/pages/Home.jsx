// App.jsx
import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import NavBar from "@components/NavBar.jsx";
import Cursor from "@components/Cursor.jsx";
import Hero from "@sections/Hero.jsx";
import { getAllPosts, getPostsByTitle, getPostByCategories, getPostByCategoriesAndTitle } from "@logic/posts.js";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import Footer from "@sections/Footer.jsx";
import "@styles/components/ColoredButton.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const PAGINATION = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let newPosts = [];

        if (categories.length > 0 && searchTerm.trim() === "") {
          // Si hay al menos una categoría, priorizamos la llamada a getPostByCategories
          newPosts = await getPostByCategories(categories);
        } else if (categories.length > 0 && searchTerm.trim() !== "") {
          // Si hay categorías y el searchTerm no está vacío, obtenemos los posts que coincidan con ambas
          newPosts = await getPostByCategoriesAndTitle(categories, searchTerm);
        } else if (categories.length === 0 && searchTerm.trim() === "") {
          // Si no hay categorías y el searchTerm está vacío, obtenemos todos los posts
          newPosts = await getAllPosts();
        } else {
          // Si no hay categorías y el searchTerm no está vacío, buscamos por título
          newPosts = await getPostsByTitle(searchTerm);
        }

        setTotalPosts(newPosts.length);
        // Controlamos la paginación
        setPosts(newPosts.slice(0, PAGINATION * page));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    // Se vuelve a ejecutar cuando cambian estas dependencias:
  }, [searchTerm, page, categories]);

  // Se usa para cargar más páginas
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Header />
      <NavBar />

      {/* 
        Pasamos las categories y la función setCategories al Hero 
        para que los checkboxes (Labels) añadan o quiten categorías.
      */}
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        setCategories={setCategories}
      />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={index}
              title={post.title}
              link={post.link}
              image={post.image}
              categories={post.categories}
            >
              {post.description}
            </Post>
          ))
        ) : (
          <p className="text-lg font-primary-font">No results found</p>
        )}
      </main>

      <div className="flex justify-center">
        {/* 
          Si el número de posts renderizados < total, 
          mostramos el botón de "Load more"
        */}
        {posts.length < totalPosts && (
          <button
            className="hoverable coloredButton"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more ..."}
          </button>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
