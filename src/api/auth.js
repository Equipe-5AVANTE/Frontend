import api from ".";
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    console.log("resposta " + JSON.stringify(response.data));

    return response.data;
  },

  cadastrarUsuario: async (fullName, email, password, role = "user") => {
    const response = await api.post("/user", {
      fullName,
      email,
      password,
      role,
    });

    return response.data;
  },

  verificarToken: async () => {
    const response = await api.get("/check");
    return response.data;
  },
};
