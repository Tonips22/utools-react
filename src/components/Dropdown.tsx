import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface DropdownProps {
  label?: string;
  children: React.ReactNode;
  customButton?: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  top?: string;
  flexWrap?: boolean;
}

export default function Dropdown({ 
  label, 
  children, 
  customButton, 
  position = "left", 
  width = "w-48",
  top = "top-12",
  flexWrap = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const positionClass = position === "right" ? "right-0" : "left-0";

  return (
    <div className="relative" ref={dropdownRef}>
      {customButton ? (
        <div onClick={() => setIsOpen(!isOpen)}>
          {customButton}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hoverable flex flex-row items-center justify-center gap-2 bg-dark px-3 py-1 rounded-full min-w-[120px] text-sm font-medium border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
        >
          {label}
          <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}
      {isOpen && (
        <div className={`absolute ${positionClass} ${top} ${width} ${flexWrap ? "grid grid-cols-4 gap-2" : "flex flex-col gap-2"} rounded-2xl bg-dark backdrop-blur-md border border-white/10 p-2 shadow-xl z-50`}>
          {children}
        </div>
      )}
    </div>
  );
}
