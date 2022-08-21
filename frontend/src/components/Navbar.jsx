import Icon from "@mdi/react";
import { mdiAccountCircle } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth"

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 bg-main flex flex-row px-5 items-center">
      <h1
        className="text-white font-extrabold text-4xl font-title cursor-pointer hover:underline"
        onClick={() => navigate("/")}
      >
        sportal
      </h1>
      <div className="ml-auto h-full flex flex-row items-center space-x-10">
        <a
          className="text-white text-2xl cursor-pointer hover:underline"
          onClick={() => navigate("/create")}
        >
          Create Post
        </a>
        <a
          className="text-white text-2xl cursor-pointer hover:underline"
          onClick={() => navigate("/search")}
        >
          Search
        </a>
        <a
          className="text-white text-2xl cursor-pointer hover:underline"
          onClick={async () => {
            await AuthService.logout();
            navigate("/");
          }}
        >
          Logout
        </a>
        <div className="text-xl flex flex-row items-center space-x-2">
          <Icon
            className="mr-1"
            path={mdiAccountCircle}
            size={3}
            color="white"
          />
          <p className="text-white text-2xl">{AuthService.getCurrentUser().user_data.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
