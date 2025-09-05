import "@styles/components/GradientText.css";

export default function GradientText({ children, className, animated = false }) {
  return (
    <span className={`bg-gradient-to-r from-light-blue via-purple to-pink bg-clip-text text-transparent ${className} ${animated ? 'animated-gradient-text' : ''}`}>
      {children}
    </span>
  );
}
