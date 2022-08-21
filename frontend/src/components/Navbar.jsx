import Icon from "@mdi/react";
import { mdiAccountCircle } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigate();

  return (
    <div className="w-full h-20 bg-main flex flex-row px-5 items-center">
      <h1
        className="text-white font-extrabold text-4xl font-title cursor-pointer hover:underline"
        onClick={() => navigation("/")}
      >
        sportal
      </h1>
      <div className="ml-auto h-full flex flex-row items-center space-x-10">
        <a
          className="text-white text-2xl cursor-pointer hover:underline"
          onClick={() => navigation("/create")}
        >
          Create Post
        </a>
        <a
          className="text-white text-2xl cursor-pointer hover:underline"
          onClick={() => navigation("/search")}
        >
          Search
        </a>
        <div className="text-xl flex flex-row items-center space-x-2">
          <Icon
            className="mr-1"
            path={mdiAccountCircle}
            size={3}
            color="white"
          />
          <p className="text-white text-2xl">Robert M.</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
