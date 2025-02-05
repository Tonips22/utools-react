import { useState, useEffect } from 'react';
import Header from '@sections/Header.jsx';
import NavBar from '@components/NavBar.jsx';
import Cursor from '@components/Cursor.jsx';
import Hero from '@sections/Hero.jsx';
import { getAllPosts, getPostsByTitle } from '@logic/posts.js';
import Post from '@components/Post.jsx';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      // Si el campo de búsqueda está vacío, mostramos todos los posts.
      if (searchTerm.trim() === '') {
        const newPosts = await getAllPosts();
        setPosts(newPosts);
      } else {
        // Si hay término de búsqueda, filtramos por título.
        const newPosts = await getPostsByTitle(searchTerm);
        setPosts(newPosts);
      }
    };

    fetchPosts();
  }, [searchTerm]);

  return (
    <>
      <Header />
      <NavBar />
      <Cursor />
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 my-8 z-20'>
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
          <p>Not Founded Results</p>
        )}
      </main>
    </>
  );
}

export default App;
