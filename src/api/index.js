import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log("ssss" + token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const authService = {
  login: async (email, password ) => {
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  
  cadastrarUsuario: async (fullName, email, password, role = 'user') => {
    const response = await api.post('/user', { fullName, email, password, role });
    return response.data;
  },
  
  verificarToken: async () => {
    const response = await api.get('/check');
    return response.data;
  }
};

export default api;

