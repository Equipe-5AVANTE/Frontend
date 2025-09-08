import { useAuth } from "../context/Auth";
import { Navigate } from "react-router-dom";


function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando aplicação...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute