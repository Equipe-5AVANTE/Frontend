
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="min-vh-100 bg-light">
      
        {isAdmin() ? (
          <Navigate to="/areamedica" replace />
        ) : (
          <Navigate to="/cadastro" replace />
        )}
  
    </div>
  );
};

export default Dashboard;
