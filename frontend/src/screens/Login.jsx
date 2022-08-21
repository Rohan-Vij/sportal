import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState({
    icon: undefined,
    color: undefined,
    tooltip: undefined,
  });
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({
    icon: undefined,
    color: undefined,
    tooltip: undefined,
  });

  useEffect(() => {
    setEmailStatus({
      icon: "error",
      color: colors.red[600],
      tooltip:
        "Error!!!!!!!!! hieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeeehieeeeeeeeeeeeeeee",
    });
    setPasswordStatus({
      icon: "check",
      color: colors.green[600],
    });
  }, []);

  return (
    <div className="h-full w-full flex flex-row">
      {/* left title bar */}
      <div className="bg-main h-full w-1/3 flex flex-col space-y-10 justify-center items-center">
        <h1 className="text-white text-[5rem] font-extrabold">sportal</h1>
        <h2 className="text-white text-[2rem]">lorem ipsum dolar amit</h2>
      </div>

      {/* right content screen (with login) */}
      <div className="bg-background h-full flex-grow flex justify-center items-center">
        {/* login box */}
        <div className="bg-white border-light-border border-4 rounded-3xl p-20 flex flex-col items-center justify-center space-y-10">
          <h1 className="text-black text-5xl font-extrabold">Login</h1>
          <form className="w-96 flex flex-col items-center justify-center space-y-10">
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
