import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Debugging: log auth state to help trace routing behavior during navigation
  // (This can be removed after diagnosing the issue.)
  // eslint-disable-next-line no-console
  console.debug('[ProtectedRoute] isLoading=', isLoading, 'isAuthenticated=', isAuthenticated);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
};
// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the login page.
// If the authentication state is still loading, it displays a loading message.