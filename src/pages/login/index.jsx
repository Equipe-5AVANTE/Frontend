import React, { useState } from 'react';

import Cadastro from '../cadastro/cadastro';
import SignInForm from '../../components/Signin';

const LoginPage= () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <>
      {isLoginMode ? (
        <SignInForm onToggleMode={toggleMode} />
      ) : (
        <Cadastro onToggleMode={toggleMode} />
      )}
    </>
  );
};

export default LoginPage;

