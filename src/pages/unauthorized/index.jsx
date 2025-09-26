import React from 'react';
import { Link } from 'react-router-dom';

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    fill="currentColor"
    className="bi bi-lock-fill text-danger mb-3"
    viewBox="0 0 16 16"
  >
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
  </svg>
 );

const Unauthorized = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <LockIcon />
        <h1 className="display-4 fw-bold">Acesso Negado</h1>
        <p className="lead text-muted mb-4">
          Você não tem permissão para visualizar esta página.
        </p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
