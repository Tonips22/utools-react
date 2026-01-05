import { useState, useEffect } from 'react';
// import AnimatedBg from '@components/AnimatedBg.jsx';
import Label from '@components/Label.jsx';
import { getAllCategories } from '@lib/db.js'; 
import { RxCross2 } from "react-icons/rx";
import GradientText from '@components/GradientText';

export default function Hero({searchTerm, setSearchTerm, activeCategories, setactiveCategories}) {
  const [value, setValue] = useState(searchTerm);
  const [allCategories, setAllCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const all = await getAllCategories();
        setAllCategories(all);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(value);
    }
  }
  

  const searchTermUpdate = () => {
    setSearchTerm(value);
  }

  const handleCategoryChange = (categoryName, isChecked) => {
    if (isChecked) {
      setactiveCategories(prev => [...prev, categoryName]);
    } else {
      setactiveCategories(prev => prev.filter(name => name !== categoryName));
    }

    setValue('');
  };
    

  return (
    <section className="min-h-[75vh] relative flex-col items-center justify-center bg-linear-to-b from-dark from-95% to-dark/20 z-10" id="hero">
      {/* <AnimatedBg /> */}

      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold cursor-default relative">
          <GradientText animated={true} shadow={true}>Utools</GradientText>
        </h1>

        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-light-blue via-purple to-pink rounded-full blur-sm opacity-75 group-hover:opacity-100 group-hover:blur-md transition-all duration-300"></div>
          <label
            className="hoverable relative flex flex-row items-center gap-4 bg-dark shadow-2xl backdrop-blur-xl rounded-full px-8 py-4 w-[350px] cursor-text md:w-[500px] lg:w-[600px]"
          >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
            onClick={searchTermUpdate}
          >
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>

          <input
            type="text"
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            autoFocus
            className="hoverable searchBar text-white bg-transparent rounded-full border-none outline-none w-full px-1"
          />

          {value && (
            <RxCross2
              className="text-white text-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out"
              onClick={() => {
                setValue('');
              }}
            />
          )}
        </label>
        </div>

        <ul className="hoverable flex flex-row items-center justify-center flex-wrap gap-2 w-[350px] md:w-[500px] lg:w-[600px]">
          {loadingCategories ? (
            // Skeleton para categorías
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="h-7 bg-gray-700 rounded-full animate-pulse"
                style={{ width: `${60 + Math.random() * 40}px` }}
              />
            ))
          ) : (
            allCategories.map((category) => (
              <Label
                key={category.id}
                color={category.color}
                text={category.nombre}
                hasCheckBox={true}
                onChange={handleCategoryChange}
                isChecked={activeCategories.includes(category.nombre)}
              />
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
