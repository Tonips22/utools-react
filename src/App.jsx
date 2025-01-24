import { useState, useEffect } from 'react';
import Header from '@sections/Header.jsx';
import NavBar from '@components/NavBar.jsx';
import Cursor from '@components/Cursor.jsx';
import Hero from '@sections/Hero.jsx';
import { getAllPosts } from '@logic/posts.js';
import Post from '@components/Post.jsx';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Obtener los posts y almacenarlos en el estado
      const newPosts = await getAllPosts();
      setPosts(newPosts);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <NavBar />
      <Cursor />
      <Hero />

      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8'>
        {posts.length > 0 ? (
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
          <p>No hay posts disponibles.</p>
        )}
      </main>
    </>
  );
}

export default App;