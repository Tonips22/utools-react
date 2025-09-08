import "@styles/components/GradientText.css";

export default function GradientText({ children, className, animated = false, shadow = false }) {
  return (
    <span className={`bg-gradient-to-r from-light-blue via-purple to-pink bg-clip-text text-transparent ${className} ${animated ? 'animated-gradient-text' : ''}`}>
      {children}

      {
        shadow && <span className={`absolute -inset-2 rounded-full text-transparent bg-gradient-to-r from-light-blue via-purple to-pink opacity-50 blur-xl z-[-1] ${animated ? 'animated-gradient-text' : ''}`}>{children}</span>
      }
    </span>
  );
}
