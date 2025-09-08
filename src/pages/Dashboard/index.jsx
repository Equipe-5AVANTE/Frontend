import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/Auth';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState(isAdmin() ? 'DOCTOR' : 'ATTENDANT');

  const renderContent = () => {
    switch (activeTab) {
      case 'ATTENDANT':
        return <Navigate to="/cadastro" replace />;
      case 'DOCTOR':
        return isAdmin() ? <Navigate to="/areamedica" replace /> : <Navigate to="/cadastro" replace />;
      default:
        return <Navigate to="/cadastro" replace />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Dashboard;
