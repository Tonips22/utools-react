// App.jsx
import { useState, useEffect } from "react";
import Header from "@sections/Header.jsx";
import NavBar from "@components/NavBar.jsx";
import Hero from "@sections/Hero.jsx";
import Post from "@components/Post.jsx";
import Loader from "@components/Loader.jsx";
import Footer from "@sections/Footer.jsx";
import "@styles/components/ColoredButton.css";
import { getAllPublishedPosts } from "@lib/db.js";

function Home() {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [page, setPage] = useState(1);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllPublishedPosts().then((data) => {
      setPosts(data);
      console.log(data);
      
      
    });
  }, []);

  const PAGINATION = 12;

  return (
    <>
      <Header />
      <NavBar />

      <Hero/>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post
              key={post.id}
              title={post.titulo}
              link={post.enlace}
              image={post.imagen}
              categories={post.post_categories}
            >
              {post.descripcion}
            </Post>
          ))
        ) : (
          <Loader />
        )}
      </main>

      <div className="flex justify-center">
        
      </div>

      <Footer />
    </>
  );
}

export default Home;
