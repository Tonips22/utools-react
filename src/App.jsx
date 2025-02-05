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
  const [page, setPage] = useState(1);
  const PAGINATION = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      // Si el campo de búsqueda está vacío, mostramos todos los posts.
      if (searchTerm.trim() === '') {
        const newPosts = await getAllPosts();
        setPosts(newPosts.slice(0, PAGINATION * page));
      } else {
        const newPosts = await getPostsByTitle(searchTerm);
        setPosts(newPosts.slice(0, PAGINATION * page));
      }
    };

    fetchPosts();
  }, [searchTerm, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
      
      <div className='flex justify-center'>
        <button
          className='px-8 py-4 backdrop-blur-md bg-slate-50/20 text-white rounded-xl cursor-pointer my-8 hover:bg-slate-50/50 transition-colors z-[999]'
          onClick={handleLoadMore}>
            Load more ...
        </button>
      </div>
      
    </>
  );
}

export default App;