interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "danger" | "cancel"; // Submit --> Degradado, Danger --> Rojo, Cancel --> Gris

}

export default function Button({ 
  children, 
  onClick, 
  disabled = false,
  type = "submit",
  className = "",
  ...props 
}) {
  const baseClasses = "hoverable flex items-center justify-center gap-2 bg-dark backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-200 relative group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer";
  
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
      <div
        className={`absolute -inset-[1px] rounded-2xl blur-sm opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-200 ease-in-out
          ${type === "danger" ? "bg-gradient-to-r from-red-500 via-pink-500 to-red-500" : ""}
          ${type === "submit" ? "bg-gradient-to-r from-light-blue via-purple to-pink" : ""}
          ${type === "cancel" ? "bg-gradient-to-r from-gray-500 to-gray-700" : ""}
        `}></div>
    </button>
  );
}
