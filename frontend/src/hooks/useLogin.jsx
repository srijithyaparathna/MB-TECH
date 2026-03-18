import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (values) => {
    try {
      setLoading(true);
      setError(null);


      const res = await API.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const token = res.data.token;


      const user = {
        name: values.username,
        email: values.username,
        role: "User",
      };


      login(token, user);

  
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;