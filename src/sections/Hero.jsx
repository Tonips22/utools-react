import { useState } from 'react';
import AnimatedBg from '@components/AnimatedBg.jsx';
import { RxCross2 } from "react-icons/rx";

export default function Hero({searchTerm, setSearchTerm}) {
  const [value, setValue] = useState(searchTerm);

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
    

  return (
    <section className="min-h-[75vh] flex-col items-center justify-center relative z-10" id="hero">
      <AnimatedBg />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl text-white font-bold cursor-default">Utools</h1>

        <label className='hoverable flex flex-row items-center gap-4 bg-black/10 shadow-2xl border-2 border-dark backdrop-blur-xl rounded-full px-8 py-4 w-[350px] cursor-text md:w-[500px] lg:w-[600px]'>
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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

        <ul className="hoverable flex flex-row items-center justify-center flex-wrap gap-2 w-[350px] md:w-[500px] lg:w-[600px]">
        </ul>
      </div>
    </section>
  );
}
