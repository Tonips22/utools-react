import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function SearchBar({ searchText = "", setSearchText }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the timeout ID for debouncing

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    // Debounce the parent state update
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
    timeOutRef.current = setTimeout(() => {
      setSearchText(inputText);
    }, 500);
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
        className="hoverable relative flex flex-row items-center gap-4 bg-dark shadow-2xl backdrop-blur-xl rounded-full px-8 py-4 w-[350px] cursor-text md:w-[550px] lg:w-[650px] border border-white/10 hover:border-white/30 focus-within:border-white/30 transition-colors duration-200 ease-in-out"
        >

        <input
        type="text"
        autoFocus
        className="text-white bg-transparent rounded-full outline-none w-full px-1"
        defaultValue={searchText}
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