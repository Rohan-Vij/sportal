import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const loggedIn = false;

  useEffect(() => {
    if (!loggedIn) return navigate("/login");
    else return navigate("/search");
  });
};

export default Home;
