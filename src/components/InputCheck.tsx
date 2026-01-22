import { useState, useEffect, useRef } from 'react';

interface InputCheckProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  className?: string;
}


export default function InputCheck({ 
  label = "",
  checked = false,
  disabled = false,
  color = "var(--white)",
  className = "",
  ...props 
}: InputCheckProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const labelRef = useRef<HTMLLabelElement>(null);

  const handleInputChange = () => {
    setIsChecked(!isChecked);
  }

  const textColor = (() => {
    if (color === "var(--white)" && isChecked)  return "var(--dark)";
    return "var(--white)";
  })();

  const baseClasses = `hoverable text-sm flex items-center justify-center gap-2 backdrop-blur-sm rounded-xl px-4 py-2 border border-dark ${isChecked ? `border-white/30` : ""} hover:border-white/30 hover:scale-105 overflow-hidden active:scale-95 transition-all duration-200 relative disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer`;
  
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <label 
      ref={labelRef}
      className={combinedClasses}
      style={{
        backgroundColor: isChecked ? color : "var(--dark)",
        color: textColor,
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className="hidden"
        {...props}
        onChange={handleInputChange}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
