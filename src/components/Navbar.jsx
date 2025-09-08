import React from 'react';
import { useAuth } from '../context/Auth';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Sistema de Reservas</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${activeTab === 'salas' ? 'active text-white' : 'text-white'}`}
                onClick={() => setActiveTab('salas')}
              >
                Salas Disponíveis
              </button>
            </li>
            {isAdmin() && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === 'reservas' ? 'active text-white' : 'text-white'}`}
                  onClick={() => setActiveTab('reservas')}
                >
                  Gerenciar Reservas
                </button>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              Olá, {user?.nome || user?.name}
              {isAdmin() && (
                <span className="badge bg-warning text-dark ms-2">Admin</span>
              )}
            </span>
            <button
              className="btn btn-light"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
