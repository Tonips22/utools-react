import { useState, useEffect, useRef } from 'react';

interface InputCheckProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  className?: string;
  type?: 'checkbox' | 'radio';
  name?: string;
  onChange?: (checked: boolean) => void;
}


export default function InputCheck({ 
  label = "",
  checked = false,
  disabled = false,
  color = "var(--white)",
  className = "",
  type = "checkbox",
  name,
  onChange,
  ...props 
}: InputCheckProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleInputChange = () => {
    if (type === 'radio') {
      // Para radio buttons, siempre se activa (nunca se desactiva)
      if (!isChecked) {
        setIsChecked(true);
        onChange?.(true);
      }
    } else {
      // Para checkboxes, se hace toggle
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    }
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
        type={type}
        name={name}
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
