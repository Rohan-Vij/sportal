const Button = ({ text, onClick, className }) => {
  return (
    <button
      type="button"
      className={`text-2xl text-white bg-accent hover:bg-dark-accent focus:ring-blue-300 rounded-xl px-20 py-2.5 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
