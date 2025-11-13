import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/common/CustomeCursor';
import AppRoutes from './routes/AppRoutes';

                

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
       <CustomCursor />
        <Router>
         <AuthProvider>
          <NotesProvider>
            <NotificationsProvider>
              <AppRoutes />
            </NotificationsProvider>
          </NotesProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App
