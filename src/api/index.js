import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("ssss" + token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
