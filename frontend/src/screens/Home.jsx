import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.getCurrentUser()) {
      navigate("/login");
    } else {
      navigate("/search");
    }
  }, []);

  return <></>;
};

export default Home;
