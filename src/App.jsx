import { useState, useEffect } from 'react';
import Header from '@sections/Header.jsx';
import NavBar from '@components/NavBar.jsx';
import Cursor from '@components/Cursor.jsx';
import Hero from '@sections/Hero.jsx';
import { getAllPosts, getPostsByTitle } from '@logic/posts.js';
import Post from '@components/Post.jsx';
import Loader from '@components/Loader.jsx';
import Footer from '@sections/Footer.jsx';
import '@styles/components/ColoredButton.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0); // Total number of posts
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const PAGINATION = 12;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let newPosts;
        if (searchTerm.trim() === '') {
          newPosts = await getAllPosts();
        }else {
          newPosts = await getPostsByTitle(searchTerm);
        }
        setTotalPosts(newPosts.length);
        setPosts(newPosts.slice(0, PAGINATION * page));

      }catch (error) {
        console.error('Error fetching posts:', error);

      }finally {
        setLoading(false);
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
          <p>No results found</p>
        )}
      </main>

      <div className='flex justify-center'>
        {posts.length < totalPosts && (
          <button
            className="coloredButton hoverable "
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more ...'}
          </button>
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;