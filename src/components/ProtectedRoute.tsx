import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotebookLoader } from './common';
import ROUTE_PATHS from '../routes/RoutePaths';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <NotebookLoader />;
  if (!isAuthenticated) return <Navigate to={ROUTE_PATHS.LOGIN} replace />;

  return children;
};
// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the login page.
// If the authentication state is still loading, it displays a loading message.