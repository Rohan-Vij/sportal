const Button = ({text}) => {
  return (
    <button
      type="button"
      className="text-2xl text-white bg-accent hover:bg-dark-accent focus:ring-4 focus:ring-blue-300 rounded-xl px-20 py-2.5 mr-2 mb-2"
    >
      {text}
    </button>
  );
};

export default Button;
