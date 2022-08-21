
const InputField = ({ title, id, required, placeholder, value, setValue }) => {
  return (
    <>
      <label htmlFor={id} className="block text-lg font-medium text-black">
        {title}
      </label>
      <input
        type="text"
        id={id}
        className="bg-gray-50 border-light-border border-4 text-gray-900 text-sm rounded-xl block w-full p-2.5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};

export default InputField;
