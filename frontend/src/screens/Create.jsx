import { useState, useRef, useEffect } from "react";

import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import StyledDatePicker from "../components/StyledDatePicker";

import AuthService from "../services/auth";
import UserService from "../services/posts";

import { useNavigate } from "react-router-dom";
import theme from "../theme";

const defaultStatus = {
  icon: undefined,
  color: undefined,
  tooltip: undefined,
};
const Create = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [sport, setSport] = useState();

  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState(defaultStatus);

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );

  const [spots, setSpots] = useState(5);
  const [spotsStatus, setSpotsStatus] = useState(defaultStatus);

  const [level, setLevel] = useState("Beginner");

  const [description, setDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState(defaultStatus);

  const leftFormSide = useRef();
  const rightFormSide = useRef();

  // Stops date picker from resizing the form
  useEffect(() => {
    leftFormSide.current.style = `height: ${leftFormSide.current.offsetHeight}px;`;
    rightFormSide.current.style = `height: ${rightFormSide.current.offsetHeight}px;`;
  });

  const createPost = async (e) => {
    e.preventDefault();

    const errorStatus = (tooltip) => ({
      icon: "error",
      color: theme.theme.colors.red[600],
      tooltip: tooltip,
    });

    if (!sport || !location || !description || !spots) {
      setMessage("Please enter a value into all fields.");
      if (!location) setLocationStatus(errorStatus("Required field."));
      if (!description) setDescriptionStatus(errorStatus("Required field."));
      if (!spots) setSpotsStatus(errorStatus("Required field."));

      return;
    }

    const response = await UserService.create(
      sport,
      location,
      AuthService.getCurrentUser().user_data.name,
      startDateTime.getTime() / 1000,
      endDateTime.getTime() / 1000,
      description,
      level,
      spots
    );

    console.log(response);

    navigate("/");
  };
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full p-10 bg-background flex flex-col space-y-5 h-full overflow-x-none overflow-y-auto justify-center">
        <h1 className="text-5xl font-extrabold">Create A Post</h1>
        {message && (
          <p className="text-red-600 font-bold">
            <span className="material-icons select-none relative top-[6px]">
              error
            </span>{" "}
            {message}
          </p>
        )}
        <div className="w-full flex flex-row space-x-10">
          <div className="w-1/2 flex flex-col space-y-10" ref={leftFormSide}>
            <Dropdown
              title="Sport"
              htmlFor="sport"
              elements={[
                "volleyball",
                "basketball",
                "running",
                "football",
                "tennis",
                "cricket",
                "baseball",
                "hockey",
                "soccer",
              ]}
              value={sport}
              setValue={setSport}
            />
            <InputField
              title="Location"
              htmlFor="location"
              placeholder="Enter a location..."
              value={location}
              setValue={setLocation}
              status={locationStatus.icon}
              statusColor={locationStatus.color}
              statusTooltip={locationStatus.tooltip}
            />
            <StyledDatePicker
              title="Start Date/Time"
              htmlFor="datetime"
              date={startDateTime}
              setDate={setStartDateTime}
              showTimeInput
            />
          </div>
          <div className="w-1/2 flex-col space-y-10" ref={rightFormSide}>
            <InputField
              title="Spots"
              htmlFor="spots"
              placeholder="Enter number of spots available here..."
              value={spots}
              setValue={setSpots}
              onChange={(val) => {
                if (/^\d+$/.test(val) || val.length === 0) setSpots(val);
              }}
              status={spotsStatus.icon}
              statusColor={spotsStatus.color}
              statusTooltip={spotsStatus.tooltip}
            />
            <Dropdown
              title="Skill Level"
              htmlFor="level"
              elements={["Beginner", "Medium", "Advanced", "Expert"]}
              value={level}
              setValue={setLevel}
            />
            <StyledDatePicker
              title="End Date/Time"
              htmlFor="datetime"
              date={endDateTime}
              setDate={setEndDateTime}
              showTimeInput
            />
          </div>
        </div>
        <InputField
          title="Description"
          htmlFor="description"
          placeholder="Enter description here..."
          value={description}
          setValue={setDescription}
          status={descriptionStatus.icon}
          statusColor={descriptionStatus.color}
          statusTooltip={descriptionStatus.tooltip}
        />
        <div className="flex w-full justify-center">
          <Button text="Submit" className="w-96" onClick={createPost} />
        </div>
      </div>
    </div>
  );
};

export default Create;
