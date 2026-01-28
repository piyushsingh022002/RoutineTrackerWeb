import { lazy, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import ROUTE_PATHS from './RoutePaths';
import AuthLayout from '../layouts/AuthLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';

// Lazy-load pages for better performance
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const OtpPage = lazy(() => import('../pages/OtpPage'));
const OtpVerificationPage = lazy(() => import('../pages/OtpVerificationPage'));
const NewPasswordPage = lazy(() => import('../pages/NewPasswordPage'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const PublicNoteEditor = lazy(() => import('../pages/PublicNoteEditor'));
const AboutIRTPage = lazy(() => import('../pages/AboutIRTPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const PrivateNotes = lazy(() => import('../pages/PrivateNotes'));
const NoteEditor = lazy(() => import('../pages/NoteEditor'));
const CreatePrivateNote = lazy(() => import('../pages/CreatePrivateNote'));
const NotePlusPage = lazy(() => import('../pages/NotePlusPage'));
const FindStoryBooks = lazy(() => import('../pages/FindStoryBooks'));
const ProgressDashboard = lazy(() => import('../pages/ProgressDashboard'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const ViewNote = lazy(() => import('../pages/ViewNote'));
const NotFound = lazy(() => import('../pages/NotFound'));
const NotebookLoaderTest = lazy(() => import('../pages/NotebookLoaderTest'));

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
    { path: ROUTE_PATHS.PUBLIC_NOTE, element: <PublicNoteEditor /> },
    { path: ROUTE_PATHS.ABOUTIRT, element: <AboutIRTPage /> },
    
    // Test pages
    { path: ROUTE_PATHS.TEST_NOTEBOOK_LOADER, element: <NotebookLoaderTest /> },

    // Auth pages wrapped in AuthLayout; each auth page is guarded by PublicRoute
    {
      element: <AuthLayout />,
      children: [
        { path: ROUTE_PATHS.LOGIN, element: <PublicRoute><LoginPage /></PublicRoute> },
        { path: ROUTE_PATHS.REGISTER, element: <PublicRoute><RegisterPage /></PublicRoute> },
        { path: ROUTE_PATHS.FORGOT_PASSWORD, element: <PublicRoute><OtpPage /></PublicRoute> },
        { path: ROUTE_PATHS.OTP_VERIFICATION, element: <PublicRoute><OtpVerificationPage /></PublicRoute> },
        { path: ROUTE_PATHS.NEW_PASSWORD, element: <PublicRoute><NewPasswordPage /></PublicRoute> },
      ],
    },

    // Protected pages: require authentication
    {
      element: <ProtectedRoute><Outlet /></ProtectedRoute>,
      children: [
        { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard /> },
        { path: ROUTE_PATHS.PRIVATENOTES, element: <PrivateNotes /> },
        { path: ROUTE_PATHS.CREATE_NEW, element: <CreatePrivateNote /> },
        { path: ROUTE_PATHS.NOTEPLUS, element: <NotePlusPage /> },
        { path: ROUTE_PATHS.NEWNOTE, element: <NoteEditor /> },
        { path: ROUTE_PATHS.NOTEBOOK, element: <FindStoryBooks /> },
        { path: ROUTE_PATHS.PROGRESS, element: <ProgressDashboard /> },
        // common alternate path used across the app
        { path: ROUTE_PATHS.VIEWNOTE, element: <ViewNote /> },
        { path: ROUTE_PATHS.NOTEEDIT, element: <NoteEditor /> },

        { path: ROUTE_PATHS.SETTINGS, element: <SettingsPage /> },
        { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },
        { path: ROUTE_PATHS.NOTIFICATIONS, element: <NotificationsPage /> },
      ],
    },

    // Explicit notfound route (navigable) and wildcard fallback
    { path: ROUTE_PATHS.NOTFOUND, element: <NotFound /> },
    { path: ROUTE_PATHS.NOTFOUNDPAGE, element: <NotFound /> },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default AppRoutes;