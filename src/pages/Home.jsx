import { useState, useEffect, useCallback } from "react";
import Header from "@sections/Header.jsx";
import NavBar from "@components/NavBar.jsx";
import Hero from "@sections/Hero.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import Button from "@components/Button.jsx";
import Footer from "@sections/Footer.jsx";
import { getAllPublishedPosts, getSearchedPublishedPosts, getFilteredPostsByCategories } from "@lib/db.js";
import Skeleton from "@components/Skeleton.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategories, setactiveCategories] = useState([]);

  const PAGINATION = 12;
  const SKELETON_COUNT = 8;

  // Helper centralizado que devuelve la página `pageNum` respetando filtros
  const fetchPage = useCallback(async (pageNum = 1) => {
    // Si hay categorías activas, pedir a la función de filtrado (que ahora acepta searchTerm)
    if (activeCategories.length > 0) {
      return await getFilteredPostsByCategories(activeCategories, pageNum, PAGINATION, searchTerm.trim());
    }

    // Si hay búsqueda (y no categorías), usar búsqueda paginada
    if (searchTerm.trim() !== "") {
      return await getSearchedPublishedPosts(searchTerm.trim(), pageNum, PAGINATION);
    }

    // Caso base: todos los posts
    return await getAllPublishedPosts(pageNum, PAGINATION);
  }, [activeCategories, searchTerm]);

  // Cuando cambie searchTerm o activeCategories, recargamos la primera página
  useEffect(() => {
    let cancelled = false;
    const loadInitial = async () => {
      setLoading(true);
      setPage(1);

      try {
        const data = await fetchPage(1);
        if (cancelled) return;
        setPosts(data);
        setHasMore(data.length === PAGINATION);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
        setHasMore(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadInitial();
    return () => { cancelled = true; };
  }, [fetchPage]);

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const data = await fetchPage(nextPage);

      // Evitar duplicados por id (por si hay mezcla de ordenaciones/sets)
      setPosts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const unique = data.filter(p => !existingIds.has(p.id));
        return [...prev, ...unique];
      });

      setPage(nextPage);
      setHasMore(data.length === PAGINATION);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <Header/>
      {/* <NavBar /> */}

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategories={activeCategories}
        setactiveCategories={setactiveCategories}
      />
      
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
        {hasMore && !loading && (
          <Button
            onClick={loadMorePosts}
            className="font-semibold z-[990] min-w-[120px] min-h-[48px] text-white"
            disabled={loadingMore}
          >
            {loadingMore ? (
              <Loader className="loader-button" />
            ) : (
              "Load More"
            )}
          </Button>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
