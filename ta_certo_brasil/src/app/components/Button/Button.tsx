import "./Button.css"

interface ButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

export default function Button({ text, className, onClick}: ButtonProps) {
  return (
    <button 
        onClick={onClick}
        className={className}>
      {text}
    </button>
  );
}