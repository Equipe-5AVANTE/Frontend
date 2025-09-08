import React, { useState } from 'react';
import Login from './Login';
import Cadastro from './Cadastro';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      {isLoginMode ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Cadastro onToggleMode={toggleMode} />
      )}
    </>
  );
};

export default AuthPage;

