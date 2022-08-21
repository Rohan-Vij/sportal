import { useEffect, useRef, useState } from "react";

const Dropdown = ({ title, htmlFor, elements, value, setValue }) => {
  const [clicked, setClicked] = useState(false);
  const btn = useRef();

  useEffect(() => {
    const checkOutsideClick = (e) => {
      if (btn.current && !btn.current.contains(e.target) && clicked)
        setClicked(false);
    };

    document.addEventListener("click", checkOutsideClick, true);
    return () => {
      document.removeEventListener("click", checkOutsideClick, true);
    };
  }, [clicked]);

  return (
    <div className="w-full">
      <label htmlFor={htmlFor} className="block text-lg font-medium text-black">
        {title}
      </label>
      <div className="w-full relative">
        <button
          type="button"
          className="text-left text-black bg-gray-50 border-4 border-dark-border focus:ring-blue-300 text-sm rounded-xl w-full p-2.5 mr-2 mb-2"
          onClick={() => setClicked(!clicked)}
          ref={btn}
        >
          {value || title}
        </button>
        <span
          className="material-icons select-none absolute bottom-5 right-2.5 cursor-pointer"
          onClick={() => setClicked(!clicked)}
        >
          {clicked ? "expand_less" : "expand_more"}
        </span>
      </div>
      <div
        id="dropdown"
        className={`${
          clicked ? "visible" : "hidden"
        } z-10 w-96 bg-white divide-y divide-gray-100 border-dark-border border-4 rounded-xl fixed`}
      >
        <ul
          className="py-1 text-sm text-black max-h-32 overflow-y-auto"
          aria-labelledby="dropdownDefault"
        >
          {elements.map((element, idx) => (
            <li key={idx}>
              <a onClick={() => setValue(element)} className="block py-2 px-4 hover:bg-background">
                {element}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
