import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@sections/Header.jsx";
import Post from "@components/Post.jsx";
// import Loader from "@components/Loader.jsx";
import Button from "@components/Button.jsx";
import InputCheck from "@components/InputCheck.tsx";
import Footer from "@sections/Footer.jsx";
import { getAllPublishedPosts, getSearchedPublishedPosts } from "@lib/db.js";
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

  const CATEGORIES = {
    Images: {
      label: "Images",
      color: "#334155cc",
    },
    Videos: {
      label: "Videos",
      color: "#374151cc",
    },
    Optimization: {
      label: "Optimization",
      color: "#4D7c0fcc",
      checked: true,
    },
    Hosting: {
      label: "Hosting",
      color: "#1E40AFcc",
    },
    Design: {
      label: "Design",
      color: "#7C3AEDcc",
    },
    Deployment: {
      label: "Deployment",
      color: "#059669cc",
    },
    Components: {
      label: "Components",
      color: "#B45309cc",
    },
    Colors: {
      label: "Colors",
      color: "#D97706cc",
    },
    Typography: {
      label: "Typography",
      color: "#DC2626cc",
    },
    Icons: {
      label: "Icons",
      color: "#E11D48cc",
    },
    Mockups: {
      label: "Mockups",
      color: "#BE185Dcc",
    },
    API: {
      label: "API",
      color: "#DB2777cc",
    },
    Animations: {
      label: "Animations",
      color: "#9D174Dcc",
    },
    Learning: {
      label: "Learning",
      color: "#7E22CEcc",
    },
  };

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
          <Dropdown label="Categories" width="w-[500px]" flexWrap={true}>

            {
              Object.keys(CATEGORIES).map((categoryKey, index) => (
                <InputCheck
                  key={index}
                  label={CATEGORIES[categoryKey].label}
                  color={CATEGORIES[categoryKey].color}
                  checked={CATEGORIES[categoryKey].checked || false}
                />
              ))
            }
          </Dropdown>

          {/* Order Dropdown */}
          <Dropdown label="Order">
            <InputCheck
              label="Newest First"
              checked={false}
            />
            <InputCheck
              label="Oldest First"
              checked={false}
            />
            <InputCheck
              label="Alphabetical A-Z"
              checked={true}
            />
            <InputCheck
              label="Alphabetical Z-A"
              checked={false}
            />
          </Dropdown>

          {/* Limit Dropdown */}
          <Dropdown label="Limit">
            <InputCheck
              label="12 items"
              checked={true}
            />
            <InputCheck
              label="24 items"
              checked={false}
            />
            <InputCheck
              label="48 items"
              checked={false}
            />
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
