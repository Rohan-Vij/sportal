import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Reached home!");
    if (!AuthService.getCurrentUser()) {
      navigate("/login");
    }
  }, []);

  return <h1>hi</h1>;
};

export default Home;
