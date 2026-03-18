import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


API.interceptors.request.use((config) => {
  const storedData = JSON.parse(localStorage.getItem("user_data"));

  if (storedData?.userToken) {
    config.headers.Authorization = `Bearer ${storedData.userToken}`;
  }

  return config;
});

export default API;