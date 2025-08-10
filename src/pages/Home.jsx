// App.jsx
import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import NavBar from "@components/NavBar.jsx";
import Hero from "@sections/Hero.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import Footer from "@sections/Footer.jsx";
import { getAllPublishedPosts, getSearchedPublishedPosts, getFilteredPostsByCategories } from "@lib/db.js";
import Skeleton from "@components/Skeleton.jsx";
import { img, span } from "framer-motion/client";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // cuando haces una búsqueda nueva
  const [loadingMore, setLoadingMore] = useState(false); // cuando cargas más
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategories, setactiveCategories] = useState([]);

  const PAGINATION = 12;
  const SKELETON_COUNT = 8;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPage(1); // Resetear página al buscar
      try {
        let data = [];
  
        if (searchTerm.trim() === "" && activeCategories.length === 0) {
          data = await getAllPublishedPosts(1, PAGINATION);
        } else if(activeCategories.length > 0 && searchTerm.trim() === "") {
          data = await getFilteredPostsByCategories(activeCategories, 1, PAGINATION);
          console.log(data);
        } else if (activeCategories.length > 0 && searchTerm.trim() !== "") {
          data = await getFilteredPostsByCategories(activeCategories);
          data = data.filter(post => post.titulo.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
          data = await getSearchedPublishedPosts(searchTerm, 1, PAGINATION);
        }
  
        setPosts(data);
        setHasMore(data.length === PAGINATION);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [searchTerm, activeCategories]);

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
  
    try {
      let data = [];
  
      if (searchTerm.trim() === "") {
        data = await getAllPublishedPosts(nextPage, PAGINATION);
      } else {
        data = await getSearchedPublishedPosts(searchTerm, nextPage, PAGINATION);
      }
  
      setPosts(prev => [...prev, ...data]);
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
          <button
            onClick={loadMorePosts}
            className="bg-dark rounded-2xl cursor-pointer px-6 py-3 font-semibold hover:bg-dark/80 transition-colors duration-300 z-[990] group min-w-[120px] min-h-[48px]"
            disabled={loadingMore}
          >
            {loadingMore ? (
              <div className="flex justify-center items-center">
                <Loader className="loader-button" />
              </div>
            ) : (
              <span
                className="hoverable text-transparent bg-clip-text 
                        bg-gradient-to-r from-light-blue via-purple to-pink 
                        bg-[length:200%_100%] bg-left 
                        group-hover:bg-right 
                        transition-[background-position] duration-200 ease-in-out"
              >
                Load More
              </span>
            )}
          </button>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Home;
