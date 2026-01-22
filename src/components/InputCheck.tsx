import { useState } from 'react';

interface InputCheckProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  hoverColor?: string;
  className?: string;
}


export default function InputCheck({ 
  label = "",
  checked = false,
  disabled = false,
  hoverColor = "var(--white)",
  className = "",
  ...props 
}: InputCheckProps) {
  const [isChecked, setIsChecked] = useState(false);

  const baseClasses = `hoverable text-sm flex items-center justify-center gap-2 bg-dark backdrop-blur-sm rounded-xl px-4 py-2 border ${checked ? "border-white/30" : "border-dark"} hover:border-white/30 hover:scale-105 overflow-hidden active:scale-95 transition-all duration-200 relative disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer`;
  
  const combinedClasses = `${baseClasses} ${className}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!disabled && !isChecked) {
      e.currentTarget.style.backgroundColor = hoverColor;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!isChecked) {
      e.currentTarget.style.backgroundColor = 'var(--dark)';
    }
  };

  return (
    <label 
      className={combinedClasses}
      style={{
        backgroundColor: isChecked ? hoverColor : 'var(--dark)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className="hidden"
        {...props}
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
