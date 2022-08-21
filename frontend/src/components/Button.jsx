const Button = ({text, onClick, className}) => {
  return (
    <button
      type="submit"
      className="text-2xl text-white bg-accent hover:bg-dark-accent focus:ring-blue-300 rounded-xl px-20 py-2.5 mr-2 mb-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
