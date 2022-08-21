import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import StyledDatePicker from "../components/StyledDatePicker";
import theme from "../theme";
import Dropdown from "../components/Dropdown";

const defaultStatus = {
  icon: undefined,
  color: undefined,
  tooltip: undefined,
};

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameStatus, setNameStatus] = useState(defaultStatus);

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(defaultStatus);

  const [gender, setGender] = useState("");

  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(defaultStatus);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberStatus, setPhoneNumberStatus] = useState(defaultStatus);

  const [dob, setDOB] = useState(new Date());

  const leftFormSide = useRef();
  const rightFormSide = useRef();

  // Stops date picker from resizing the form
  useEffect(() => {
    leftFormSide.current.style = `height: ${leftFormSide.current.offsetHeight}px;`;
    rightFormSide.current.style = `height: ${rightFormSide.current.offsetHeight}px;`;
  });

  useEffect(() => {
    setEmailStatus({
      icon: "error",
      color: theme.theme.colors.red[600],
      tooltip:
        "Error!!!!!!!!! hieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeee",
    });
    setPasswordStatus({
      icon: "check",
      color: theme.theme.colors.green[600],
    });
  }, []);

  return (
    <div className="h-full w-full flex flex-row">
      {/* left title bar */}
      <div className="bg-main h-full w-1/3 flex flex-col justify-center items-center">
        <h1 className="text-white text-[5rem] font-extrabold font-title">
          sportal
        </h1>
        <h2 className="text-white text-[2rem] font-slogan">
          Connect. Organize. Play.
        </h2>
      </div>

      {/* right content screen (with signup) */}
      <div className="bg-background h-full flex-grow flex justify-center items-center">
        {/* login box */}
        <div className="bg-white border-light-border border-4 rounded-3xl p-20 flex flex-col items-center justify-center space-y-10">
          <h1 className="text-black text-5xl font-extrabold">Signup</h1>
          <form className="flex flex-col items-center justify-center space-y-10">
            <div className="flex flex-row items-center justify-center space-x-10">
              <div
                className="w-80 flex-col items-center justify-center space-y-10 z-10"
                ref={leftFormSide}
              >
                <InputField
                  title="Name"
                  htmlFor="name"
                  placeholder="John Smith"
                  value={name}
                  setValue={setName}
                  status={nameStatus.icon}
                  statusColor={nameStatus.color}
                  statusTooltip={nameStatus.tooltip}
                />
                <InputField
                  title="Email"
                  htmlFor="email"
                  placeholder="example@gmail.com"
                  value={email}
                  setValue={setEmail}
                  status={emailStatus.icon}
                  statusColor={emailStatus.color}
                  statusTooltip={emailStatus.tooltip}
                />
                <Dropdown
                  title="Gender"
                  htmlFor="gender"
                  elements={["Male", "Female", "Other", "Prefer not to say"]}
                  value={gender}
                  setValue={setGender}
                />
              </div>
              <div
                className="w-80 flex-col items-center justify-center space-y-10"
                ref={rightFormSide}
              >
                <InputField
                  title="Password"
                  htmlFor="password"
                  placeholder="Enter password here..."
                  value={password}
                  setValue={setPassword}
                  status={passwordStatus.icon}
                  statusColor={passwordStatus.color}
                  statusTooltip={passwordStatus.tooltip}
                />
                <InputField
                  title="Phone Number"
                  htmlFor="phone"
                  placeholder="123-456-7890"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  status={phoneNumberStatus.icon}
                  statusColor={phoneNumberStatus.color}
                  statusTooltip={phoneNumberStatus.tooltip}
                />
                <StyledDatePicker
                  title="Date of Birth"
                  htmlFor="dob"
                  date={dob}
                  setDate={setDOB}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 w-full">
              <a
                className="text-main font-bold hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </a>
              <Button text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
