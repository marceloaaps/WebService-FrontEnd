import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');

  // Redireciona para o login caso não exista token
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
