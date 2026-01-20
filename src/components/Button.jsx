// src/components/Button.jsx

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
