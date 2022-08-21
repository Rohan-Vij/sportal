import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import theme from "../theme";

import AuthService from "../services/auth";

const defaultStatus = {
  icon: undefined,
  color: undefined,
  tooltip: undefined,
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(defaultStatus);

  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(defaultStatus);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmailStatus({
      icon: "error",
      color: theme.theme.colors.red[600],
      tooltip:
        "Error!",
    });
    setPasswordStatus({
      icon: "check",
      color: theme.theme.colors.green[600],
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await AuthService.login(email, password);

    console.log(response);

    if (response.status === 200) {
      navigate("/");
    } else if (response.status === 404) {
      setEmailStatus({
        icon: "error",
        color: theme.theme.colors.red[600],
        tooltip: "We could not find a user with that email.",
      });
      setMessage("We could not find a user with that email.");

    } else if (response.status === 401) {
      setPasswordStatus({
        icon: "error",
        color: theme.theme.colors.red[600],
        tooltip: "Incorrect password.",
      });
      setMessage("Incorrect password.");

    } else {
      setEmailStatus({
        icon: "error",
        color: theme.theme.colors.red[600],
        tooltip: "Something went wrong.",
      });

      setPasswordStatus({
        icon: "error",
        color: theme.theme.colors.red[600],
        tooltip: "Something went wrong.",
      });

      setMessage("Something went wrong.");
    }
  }


  return (
    <div className="h-full w-full flex flex-row">
      {/* left title bar */}
      <div className="bg-main h-full w-1/3 flex flex-col justify-center items-center">
        <h1 className="text-white text-[5rem] font-extrabold font-title">sportal</h1>
        <h2 className="text-white text-[2rem] font-slogan">Connect. Organize. Play.</h2>
      </div>

      {/* right content screen (with login) */}
      <div className="bg-background h-full flex-grow flex justify-center items-center">
        {/* login box */}
        <div className="bg-white border-light-border border-4 rounded-3xl p-20 flex flex-col items-center justify-center space-y-10">
          <h1 className="text-black text-5xl font-extrabold">Login</h1>
          {message && <p className="text-red-600 font-bold"><span className="material-icons select-none relative top-[6px]">error</span> {message}</p>}
          <form className="w-80 flex flex-col items-center justify-center space-y-10" onSubmit={handleSubmit}>
            <InputField
              title="Email"
              htmlFor="email" 
              value={email}
              setValue={setEmail}
              placeholder="example@gmail.com"
              status={emailStatus.icon}
              statusColor={emailStatus.color}
              statusTooltip={emailStatus.tooltip}
            />
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
            <div className="flex flex-col items-center justify-center space-y-3 w-full">
              <a
                className="text-main font-bold hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Don't have an account?
              </a>
              <Button text="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
