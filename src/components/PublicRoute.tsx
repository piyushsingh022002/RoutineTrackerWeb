// PublicRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotebookLoader } from './common';

interface PublicRouteProps {
  children: React.ReactElement;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return <NotebookLoader />;
  }

  return children;
};
