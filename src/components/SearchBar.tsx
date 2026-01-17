import { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface SearchBarProps {
  searchText: string;
}

export default function SearchBar({ searchText: initialSearchText = "" }: SearchBarProps) {

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState(initialSearchText);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleInputClear = () => {
    setSearchText("");
    
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

  }

  

  return (
    <label
        className="hoverable relative flex flex-row items-center gap-4 bg-dark shadow-2xl backdrop-blur-xl rounded-full px-8 py-4 w-[350px] cursor-text md:w-[550px] lg:w-[650px]"
        >

        <input
        type="text"
        autoFocus
        className="hoverable text-white bg-transparent rounded-full border-none outline-none w-full px-1"
        value={searchText}
        onChange={handleInputChange}
        ref={inputRef}
        placeholder="Type something to find..."
        />

        <RxCross2
            className={`text-white text-2xl cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 ease-in-out ${searchText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleInputClear}
        />
    </label>
  );
}