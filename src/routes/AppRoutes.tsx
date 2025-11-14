import { lazy, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import ROUTE_PATHS from './RoutePaths';
// import AuthLayout from '../layouts/AuthLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';

// Lazy-load pages for better performance
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const AboutIRTPage = lazy(() => import('../pages/AboutIRTPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NoteEditor = lazy(() => import('../pages/NoteEditor'));
const NotePlusPage = lazy(() => import('../pages/NotePlusPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const ViewNote = lazy(() => import('../pages/ViewNote'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    // Root redirect depending on auth state
    {
      path: ROUTE_PATHS.ROOT,
      element: <Navigate to={isAuthenticated ? ROUTE_PATHS.DASHBOARD : ROUTE_PATHS.LANDINGPAGE} replace />,
    },

    // Public pages
    { path: ROUTE_PATHS.LANDINGPAGE, element: <LandingPage /> },
    { path: ROUTE_PATHS.ABOUTIRT, element: <AboutIRTPage /> },

    // Auth pages wrapped in AuthLayout; each auth page is guarded by PublicRoute
    {
      // element: <AuthLayout />,
      children: [
        { path: ROUTE_PATHS.LOGIN, element: <PublicRoute><LoginPage /></PublicRoute> },
        { path: ROUTE_PATHS.REGISTER, element: <PublicRoute><RegisterPage /></PublicRoute> },
      ],
    },

    // Protected pages: require authentication
    {
      element: <ProtectedRoute><Outlet /></ProtectedRoute>,
      children: [
        { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard /> },
        { path: ROUTE_PATHS.NOTEPLUS, element: <NotePlusPage /> },
        { path: ROUTE_PATHS.NEWNOTE, element: <NoteEditor /> },
        // common alternate path used across the app
        { path: ROUTE_PATHS.VIEWNOTE, element: <ViewNote /> },
        // { path: ROUTE_PATHS.NOTEEDIT, element: <NoteEditor /> },
        { path: ROUTE_PATHS.SETTINGS, element: <SettingsPage /> },
        { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },
        { path: ROUTE_PATHS.NOTIFICATIONS, element: <NotificationsPage /> },
      ],
    },

    // Fallback / Not found
    { path: ROUTE_PATHS.NOTFOUNDPAGE, element: <NotFound /> },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default AppRoutes;