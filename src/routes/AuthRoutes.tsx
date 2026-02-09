// routes/AuthRoutes.tsx
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ROUTE_PATHS from './RoutePaths';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import { PublicRoute } from '../components/PublicRoute';
import { ProtectedRoute } from '../components/ProtectedRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const OtpPage = lazy(() => import('../pages/OtpPage'));
const OtpVerificationPage = lazy(() => import('../pages/OtpVerificationPage'));
const NewPasswordPage = lazy(() => import('../pages/NewPasswordPage'));

const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotesListPage = lazy(() => import('../pages/NotesListPage'));
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

const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: ROUTE_PATHS.ROOT,
      element: (
        <Navigate
          to={isAuthenticated ? ROUTE_PATHS.DASHBOARD : ROUTE_PATHS.LOGIN}
          replace
        />
      ),
    },

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

    {
      element: <ProtectedRoute><Outlet /></ProtectedRoute>,
      children: [
        { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard /> },
        { path: ROUTE_PATHS.NOTES, element: <NotesListPage /> },
        { path: ROUTE_PATHS.PRIVATENOTES, element: <PrivateNotes /> },
        { path: ROUTE_PATHS.CREATE_NEW, element: <CreatePrivateNote /> },
        { path: ROUTE_PATHS.NOTEPLUS, element: <NotePlusPage /> },
        { path: ROUTE_PATHS.NEWNOTE, element: <NoteEditor /> },
        { path: ROUTE_PATHS.NOTEBOOK, element: <FindStoryBooks /> },
        { path: ROUTE_PATHS.PROGRESS, element: <ProgressDashboard /> },
        { path: ROUTE_PATHS.VIEWNOTE, element: <ViewNote /> },
        { path: ROUTE_PATHS.NOTEEDIT, element: <NoteEditor /> },
        { path: ROUTE_PATHS.SETTINGS, element: <SettingsPage /> },
        { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },
        { path: ROUTE_PATHS.NOTIFICATIONS, element: <NotificationsPage /> },
      ],
    },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default AuthRoutes;
