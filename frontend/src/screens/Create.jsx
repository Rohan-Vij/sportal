import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import StyledDatePicker from "../components/StyledDatePicker";
import Button from "../components/Button";
import AuthService from "../services/auth";
import UserService from "../services/posts";
const Create = () => {
  const [sport, setSport] = useState();
  const [location, setLocation] = useState();
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000)
  );
  const [spots, setSpots] = useState(5);
  const [description, setDescription] = useState("");
  const createPost= async ()=>{
    await UserService.create(sport,location, AuthService.getCurrentUser(),startDateTime, endDateTime, description, spots)
  }
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="w-full p-10 bg-background flex flex-col space-y-10 h-full overflow-x-none overflow-y-auto justify-center">
        <h1 className="text-5xl font-extrabold">Create A Post</h1>
        <div className="w-full flex flex-row space-x-10">
          <div className="w-1/2 flex flex-col space-y-10">
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
            />
            <StyledDatePicker
              title="Start Date/Time"
              htmlFor="datetime"
              date={startDateTime}
              setDate={setStartDateTime}
              showTimeInput
            />
          </div>
          <div className="w-1/2 flex-col space-y-10">
            <InputField
              title="Spots"
              htmlFor="spots"
              placeholder="Enter number of spots available here..."
              value={spots}
              setValue={setSpots}
              onChange={(val) => {
                if (/^\d+$/.test(val) || val.length === 0) setSpots(val);
              }}
            />
            <StyledDatePicker
              title="End Date/Time"
              htmlFor="datetime"
              date={endDateTime}
              setDate={setEndDateTime}
              showTimeInput
            />
            <InputField
              title="Description"
              htmlFor="description"
              placeholder="Enter description here..."
              value={description}
              setValue={setDescription}
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button text="Submit" className="w-96" onClick={createPost} />
        </div>
      </div>
    </div>
  );
};

export default Create;
