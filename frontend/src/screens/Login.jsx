import InputField from "../components/InputField";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="h-full w-full flex flex-row">
      <div className="bg-main h-full w-1/3 flex flex-col space-y-20 justify-center items-center">
        <h1 className="text-white text-[7rem] font-extrabold">sportle</h1>
        <h2 className="text-white text-[2.5rem]">lorem ipsum dolar amit</h2>
      </div>
      <div className="bg-background h-full flex-grow flex justify-center items-center">
        <div className="bg-white border-light-border border-4 rounded-3xl w-[40rem] h-[40rem] flex flex-col items-center justify-center space-y-10">
          <h1 className="text-black text-5xl font-extrabold">Login</h1>
          <form className="w-96">
            <InputField
              title="Username"
              value={username}
              setValue={setUsername}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
