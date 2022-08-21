import DatePicker from "react-datepicker";

const StyledDatePicker = ({ title, htmlFor, date, setDate }) => {
  return (
    <div className="w-full">
      <label htmlFor={htmlFor} className="block text-lg font-medium text-black">
        {title}
      </label>
      <div className="flex flex-row space-x-2 justify-center items-center bg-gray-50 border-4 border-dark-border focus-within:border-main text-gray-900 text-sm rounded-xl w-full p-2.5">
        <span className="material-icons select-none">event</span>
        <DatePicker
          selected={date}
          onChange={setDate}
          popperPlacement="top"
          className="bg-inherit w-full h-full outline-none grow"
          popperClassName="box-border"
          htmlFor={htmlFor}
        />
      </div>
    </div>
  );
};

export default StyledDatePicker;
