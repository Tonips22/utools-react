import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@sections/Header.jsx";
import Post from "@components/Post.jsx";
// import Loader from "@components/Loader.jsx";
import Button from "@components/Button.jsx";
import Footer from "@sections/Footer.jsx";
import { getAllPublishedPosts, getSearchedPublishedPosts, getFilteredPostsByCategories } from "@lib/db.js";
import Skeleton from "@components/Skeleton.jsx";
import SearchBar from "@components/SearchBar.tsx";
import Dropdown from "@components/Dropdown.tsx";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("title") || "");
  const [loading, setLoading] = useState(false);
  
  // Constantes de paginación y esqueleto
  const PAGINATION = 12;
  const SKELETON_COUNT = 8;

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      try {
        let data = [];
        if (searchTerm.trim() === "") {
          data = await getAllPublishedPosts(1, PAGINATION);
        } else {
          data = await getSearchedPublishedPosts(searchTerm, 1, PAGINATION);
        }
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, searchParams]);

  return (
    <>
      <Header/>

      {/* Crear formulario de búsqueda, con funcion onSubmit que se ejecute cada vez que se cambie el valor del searchTerm o en su defecto al cambiar algún filtro */}

      <section className="min-h-[75vh] flex flex-col items-center justify-center">
        <h1 className="font-primary text-7xl font-bold pointer-events-none mb-8">Utools</h1>
        <SearchBar searchText={searchTerm} setSearchText={setSearchTerm} setSearchParams={setSearchParams} />
        <div className="mt-4 flex items-center gap-4 text-white">
          {/* Categories Dropdown */}
          <Dropdown label="Categories">
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de filtro
              }}
            >
              All Categories
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de filtro
              }}
            >
              Development
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de filtro
              }}
            >
              Design
            </button>
          </Dropdown>

          {/* Order Dropdown */}
          <Dropdown label="Order">
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de ordenamiento
              }}
            >
              Newest First
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de ordenamiento
              }}
            >
              Oldest First
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de ordenamiento
              }}
            >
              Alphabetical
            </button>
          </Dropdown>

          {/* Limit Dropdown */}
          <Dropdown label="Limit">
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de límite
              }}
            >
              12 items
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de límite
              }}
            >
              24 items
            </button>
            <button
              className="hoverable w-full flex items-center gap-2 rounded-lg py-2 px-3 text-sm text-white bg-transparent hover:bg-white hover:text-dark transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => {
                // Implementar lógica de límite
              }}
            >
              48 items
            </button>
          </Dropdown>
        </div>
      </section>

      
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
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
            >
              {post.descripcion}
            </Post>
          ))
        ) : (
          <img src="no-results.avif" alt="No results found image" className="col-span-4 row-span-1" />
        )}
      </main>

      <div className="flex justify-center mt-8">
          <Button
            className="font-semibold z-[990] min-w-[120px] min-h-[48px] text-white"
          >
            Load More
          </Button>
      </div>

      <Footer />
    </>
  );
}

export default Search;
