import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import Settings from './pages/SettingsPage';
import NotificationPage from './pages/NotificationsPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NoteEditor from './pages/NoteEditor';
import ViewNote from './pages/ViewNote';
import NotFound from './pages/NotFound';

import GlobalStyle from './styles/GlobalStyle';

import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

import NotePlusPage from './pages/NotePlusPage';
import AboutIRTPage from './pages/AboutIRTPage';
import CustomCursor from './components/common/CustomCursor';
                

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <CustomCursor />
      <Router>
        <AuthProvider>
          <NotesProvider>
            <NotificationsProvider>
              <Routes>
                {/* Public routes */}
                <Route 
                  path="/" 
                  element={
                    <PublicRoute>
                      <LandingPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/noteplus" 
                  element={
                    <PublicRoute>
                      <NotePlusPage />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
                 <Route 
                  path="/aboutIRT" 
                  element={
                    <PublicRoute>
                      <AboutIRTPage />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <ProtectedRoute>
                      <NotificationPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notes/new" 
                  element={
                    <ProtectedRoute>
                      <NoteEditor />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notes/:id" 
                  element={
                    <ProtectedRoute>
                      <ViewNote />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notes/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <NoteEditor />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Not found route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationsProvider>
          </NotesProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App
