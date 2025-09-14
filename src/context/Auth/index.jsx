import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../../api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await authService.verificarToken();
        if (response) {
          setUser(response);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.token) {
        localStorage.setItem("authToken", response.token);

        // decodifica o token para pegar os dados do usuário
        const decoded = jwtDecode(response.token);
        let aaaa = setUser({
          fullName: decoded.fullName || decoded.fullName,
          role: decoded.role,
        });
        setIsAuthenticated(true);
        console.log(aaaa);

        return { success: true };
      }

      return { success: false, message: "Credenciais inválidas" };
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer login",
      };
    }
  };

  const cadastrar = async (fullName, email, password, role = "user") => {
    try {
      await authService.cadastrarUsuario(fullName, email, password, role);
      return { success: true, message: "Usuário cadastrado com sucesso!" };
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao cadastrar usuário",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user?.role === "DOCTOR" || user?.Role === "DOCTOR";
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    cadastrar,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
