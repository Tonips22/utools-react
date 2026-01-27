import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@sections/Header.jsx";
import Post from "@components/Post.jsx";
// import Loader from "@components/Loader.jsx";
// import Button from "@components/Button.jsx";
import InputCheck from "@components/InputCheck.tsx";
import Footer from "@sections/Footer.jsx";
import { getSearchedPosts, getAllCategories } from "@lib/db.js";
import Skeleton from "@components/Skeleton.jsx";
import SearchBar from "@components/SearchBar.tsx";
import Dropdown from "@components/Dropdown.tsx";

function Search() {
  // Parámetros de url
  const [searchParams, setSearchParams] = useSearchParams();

  // Post y categorías
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Estados de búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("title") || "");
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState(() => searchParams.get("orderBy") || "alphabetical-az");
  const [limit, setLimit] = useState(() => parseInt(searchParams.get("limit")) || 24);
  const [selectedCategories, setSelectedCategories] = useState(() => searchParams.getAll("category") || []);
  
  // Constantes de paginación y esqueleto
  // const PAGINATION = 12;
  const SKELETON_COUNT = 8;

  // UseEffect para actualizar el título de la página
  useEffect(() => {
      document.title = "Search | Utools";
  }, []);

  // UseEffect para cargar los posts según los parámetros de búsqueda
  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      try {
        let data = [];
        data = await getSearchedPosts(searchTerm, 1, limit, orderBy, "published", selectedCategories);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, limit, orderBy, selectedCategories]);

  // useEffect para cargar las categrorías
  useEffect(() => {
    const fetchCategories = async () => {
      try{
        let data = [];
        data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const isSelectedCategory = (categoryName) => {
    return selectedCategories.includes(categoryName.toLowerCase());
  }

  const handleCategoryChange = (categoryName) => {
    const newSelectedCategories = isSelectedCategory(categoryName)
      ? selectedCategories.filter(cat => cat !== categoryName.toLowerCase())
      : [...selectedCategories, categoryName.toLowerCase()];
    setSelectedCategories(newSelectedCategories);

    // Actualizar los search params
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("category");
    newSelectedCategories.forEach(cat => newSearchParams.append("category", cat));
    setSearchParams(newSearchParams);
  }

  // Handlers para cambios en los inputs de límite y orden
  const handleInputLimitChange = (limit) => {
    if (limit === 24){
      searchParams.delete("limit");
    }else{
      searchParams.set("limit", limit);
    }
    setLimit(limit);
    setSearchParams(searchParams);
  }

  const handleInputOrderChange = (order) => {
    if (order === "alphabetical-az"){
      searchParams.delete("orderBy");
    }else{
      searchParams.set("orderBy", order);
    }
    setOrderBy(order);
    setSearchParams(searchParams);
  }
  

  return (
    <>
      <Header/>

      {/* Crear formulario de búsqueda, con funcion onSubmit que se ejecute cada vez que se cambie el valor del searchTerm o en su defecto al cambiar algún filtro */}

      <section className="min-h-[75vh] flex flex-col items-center justify-center">
        <h1 className="font-primary text-7xl font-bold pointer-events-none mb-8">Utools</h1>
        <SearchBar searchText={searchTerm} setSearchText={setSearchTerm} searchParams={searchParams} setSearchParams={setSearchParams} />
        <div className="mt-4 flex items-center gap-4 text-white">
          {/* Categories Dropdown */}
          <Dropdown label="Categories" width="w-[500px]" flexWrap={true}>

            {
              categories.map((category) => (
                <InputCheck
                  key={category.id}
                  type="checkbox"
                  name="categories"
                  label={category.nombre}
                  color={category.color}
                  checked={isSelectedCategory(category.nombre)}
                  onChange={() => handleCategoryChange(category.nombre)}
                />
            ))}
          </Dropdown>

          {/* Order Dropdown */}
          <Dropdown label="Order">
            {/* <InputCheck
              type="radio"
              name="order"
              label="Newest First"
              checked={orderBy === "newest"}
              onChange={() => setOrderBy("newest")}
            />
            <InputCheck
              type="radio"
              name="order"
              label="Oldest First"
              checked={orderBy === "oldest"}
              onChange={() => setOrderBy("oldest")}
            /> */}
            <InputCheck
              type="radio"
              name="order"
              label="Alphabetical A-Z"
              checked={orderBy === "alphabetical-az"}
              onChange={() => handleInputOrderChange("alphabetical-az")}
            />
            <InputCheck
              type="radio"
              name="order"
              label="Alphabetical Z-A"
              checked={orderBy === "alphabetical-za"}
              onChange={() => handleInputOrderChange("alphabetical-za")}
            />
          </Dropdown>

          {/* Limit Dropdown */}
          <Dropdown label="Limit">
            <InputCheck
              type="radio"
              name="limit"
              label="24 items"
              checked={limit === 24}
              onChange={() => handleInputLimitChange(24)}
            />
            <InputCheck
              type="radio"
              name="limit"
              label="48 items"
              checked={limit === 48}
              onChange={() => handleInputLimitChange(48)}
            />
            <InputCheck
              type="radio"
              name="limit"
              label="96 items"
              checked={limit === 96}
              onChange={() => handleInputLimitChange(96)}
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
          {/* <Button
            className="font-semibold z-[990] min-w-[120px] min-h-[48px] text-white"
            onClick={() => {
              const newLimit = parseInt(limit) * 2;
              setLimit(newLimit);
              searchParams.set("limit", newLimit);
              setSearchParams(searchParams);
            }}
          >
            Load More
          </Button> */}
      </div>

      <Footer />
    </>
  );
}

export default Search;
