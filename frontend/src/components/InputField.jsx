import { usePopper } from "react-popper";
import { useState, useRef, useEffect } from "react";
import theme from "../theme";

const InputField = ({
  title,
  htmlFor,
  required,
  placeholder,
  value,
  setValue,
  status,
  statusColor,
  statusTooltip,
}) => {
  const iconRef = useRef();
  const tooltipRef = useRef();
  const arrowRef = useRef();

  const [hovered, setHovered] = useState(false);

  const { styles, attributes, update } = usePopper(
    iconRef.current,
    tooltipRef.current,
    {
      placement: "top",
      modifiers: [{ name: "arrow", options: { element: arrowRef.current } }],
    }
  );

  const borderColor = statusColor
    ? statusColor
    : theme.theme.colors["dark-border"];

  useEffect(() => {
    if (!update) return;
    update();
  }, [update, hovered]);

  return (
    <div className="w-full relative">
      <label htmlFor={htmlFor} className="block text-lg font-medium text-black">
        {title}
      </label>
      <input
        type="text"
        className="bg-gray-50 border-4 text-gray-900 text-sm rounded-xl block w-full p-2.5 outline-none placeholder:italic"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={(e) =>
          (e.target.style.borderColor = theme.theme.colors["main"])
        }
        onBlur={(e) => (e.target.style.borderColor = borderColor)}
        placeholder={placeholder}
        required={required}
        style={{
          borderColor,
        }}
      />
      <span
        className={`material-icons select-none absolute right-2.5 bottom-3`}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={iconRef}
        style={{
          color: statusColor,
        }}
      >
        {status}
      </span>

      {statusTooltip && (
        <div
          ref={tooltipRef}
          className="bg-white p-2 rounded-lg border-2 border-light-border max-w-xl break-words"
          style={styles.popper}
          {...attributes.popper}
          hidden={!hovered}
        >
          <p className="text-center">{statusTooltip}</p>
          <div ref={arrowRef} id="arrow" style={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export default InputField;
