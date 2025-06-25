import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NoteEditor from './pages/NoteEditor';
import ViewNote from './pages/ViewNote';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotesProvider>
          <NotificationsProvider>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={
                  // <PublicRoute>
                    <LandingPage />
                  // </PublicRoute>
                } 
              />
              <Route 
                path="/login" 
                element={
                  // <PublicRoute>
                    <LoginPage />
                  // </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  // <PublicRoute>
                    <RegisterPage />
                  // </PublicRoute>
                } 
              />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  // <ProtectedRoute>
                    <Dashboard />
                  // </ProtectedRoute>
                } 
              />
              <Route 
                path="/notes/new" 
                element={
                  // <ProtectedRoute>
                    <NoteEditor />
                  // </ProtectedRoute>
                } 
              />
              <Route 
                path="/notes/:id" 
                element={
                  // <ProtectedRoute>
                    <ViewNote />
                  // </ProtectedRoute>
                } 
              />
              <Route 
                path="/notes/:id/edit" 
                element={
                  // <ProtectedRoute>
                    <NoteEditor />
                  // </ProtectedRoute>
                } 
              />
              
              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationsProvider>
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App
