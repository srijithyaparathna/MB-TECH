import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api"; 

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    
    if (values.password !== values.passwordConfirm) {
      setError("Passwords do not match");
      message.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

     
      const payload = {
        username: values.username, 
        password: values.password,
        name: values.fullname || values.username, 
      };


      const res = await API.post("/auth/register", payload);

      if (res.status === 201 || res.data.message) {
        message.success(res.data.message || "Registration successful!");
        navigate("/login"); 
      } else {
        setError(res.data.message || "Registration failed");
        message.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      message.error(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;