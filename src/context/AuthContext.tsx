import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://recotrackapi.onrender.com/api';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isAxiosErrorWithMessage(err: unknown): err is { response: { status: number; data: { message: string } } } {
  if (!isObject(err)) return false;
  const response = err.response;
  if (!isObject(response)) return false;
  const data = response.data;
  if (!isObject(data)) return false;
  return typeof data.message === 'string' && typeof response.status === 'number';
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'SET_TOKEN_AUTHENTICATED'; payload: string }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_USER_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_FAIL' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_TOKEN_AUTHENTICATED':
      // Token is set and user is authenticated, but user details are loading
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload, isAuthenticated: true, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, isLoading: false, error: null };
    case 'LOAD_USER_SUCCESS':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'AUTH_ERROR':
    case 'LOAD_USER_FAIL':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false, error: action.type === 'AUTH_ERROR' ? action.payload : state.error };
    case 'LOGOUT':
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  googleAuth: (accessToken: string) => Promise<{ token: string; message: string; email?: string }>;
  setAuthToken: (token: string) => void;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //set axios default header when token changes
  useEffect(() => {
    if (state.token) {
      //if token exist or changes, it will update the header
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      //if there is no token, it will delete the header
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     if (!state.token) {
  //       dispatch({ type: 'LOAD_USER_FAIL' });
  //       return;
  //     }
  //     try {
  //       const res = await axios.get(`${API_URL}/user`, {
  //         headers: {
  //           'X-Client-Id': 'web-ui-v1.0',
  //           'Authorization': `Bearer ${state.token}`,
  //         },
  //       });
  //       // Support both res.data.data and res.data for user object
  //       const userData = res.data?.data || res.data;
  //       dispatch({ type: 'LOAD_USER_SUCCESS', payload: userData });
  //     } catch (err) {
  //       console.error('Failed to load user:', err);
  //       dispatch({ type: 'LOAD_USER_FAIL' });
  //     }
  //   };
  //   loadUser();
  // }, [state.token]);

  // 2) User Loader Effect (Add THIS here)
  useEffect(() => {
    const loadUser = async () => {
      if (!state.token) {
        dispatch({ type: 'LOAD_USER_FAIL' });
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/user`, {
          headers: {
            'X-Client-Id': 'web-ui-v1.0',
            Authorization: `Bearer ${state.token}`,
          },
        });

        const userData = res.data?.data || res.data;
        dispatch({ type: 'LOAD_USER_SUCCESS', payload: userData });
      } catch (err) {
        console.error('Failed to load user:', err);
        dispatch({ type: 'LOAD_USER_FAIL' });
      }
    };

    loadUser();
  }, [state.token]);

  // Helper function to fetch user details after login/register
  // const fetchUserDetails = async (token: string): Promise<User | null> => {
  //   try {
  //     const res = await axios.get(`${API_URL}/user`, {
  //       headers: {
  //         'X-Client-Id': 'web-ui-v1.0',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     // Support both res.data.data and res.data for user object
  //     const userData = res.data?.data || res.data;
  //     return userData as User;
  //   } catch (err) {
  //     console.error('Failed to fetch user details:', err);
  //     // Return null if user details fetch fails, we'll load them on the useEffect instead
  //     return null;
  //   }
  // };

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await axios.post(`${API_URL}/Auth/login`, credentials, {
        headers: {
          'X-Client-Id': 'web-ui-v1.0',
        },
      });

      const { token } = res.data;

      // Immediately authenticate
    dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });

      // Try to fetch user details, but don't fail if it doesn't work
      // const user = await fetchUserDetails(token);

      // if (user) {
      //   dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      // } else {
      //   // If we can't fetch user details immediately, set token as authenticated
      //   // and let useEffect load user details
      //   dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });
      // }
    } catch (err: unknown) {
      let errorMessage = 'Login failed';

      // Use the actual error message from API
      if (isAxiosErrorWithMessage(err)) {
        errorMessage = err.response.data.message;
      }

      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // Register User
  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials, {
        headers: {
          'X-Client-Id': 'web-ui-v1.0',
        },
      });

      const { token } = res.data;

      dispatch({ type: 'REGISTER_SUCCESS', payload: token });
      dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });

      // Try to fetch user details, but don't fail if it doesn't work
      // const user = await fetchUserDetails(token);

      // if (user) {
      //   dispatch({ type: 'REGISTER_SUCCESS', payload: { user, token } });
      // } else {
      //   // If we can't fetch user details immediately, set token as authenticated
      //   // and let useEffect load user details
      //   dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });
      // }
    } catch (err: unknown) {
      const errorMessage = isAxiosErrorWithMessage(err) ? err.response.data.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const googleAuth = async (idToken: string): Promise<{ token: string; message: string; email?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const res = await axios.post(
        `${API_URL}/Auth/google`,
        { accessToken: idToken },
        {
          headers: {
            'X-Client-Id': 'web-ui-v1.0',
          },
        }
      );

      const { token, message } = res.data;
      
      // If Google auth returns a normal auth token with success, treat it
      // like a regular login/register and authenticate the user
      if (token && message === 'success') {
        dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });
      }
      
      // Set loading to false when done
      dispatch({ type: 'SET_LOADING', payload: false });
      
      // Return the response so the caller can decide what to do
      // If token exists, it means user needs to set password (temp token)
      // Otherwise, user is already registered and authenticated
      return { token, message, email: res.data.email };

    } catch (err: unknown) {
      const errorMessage = isAxiosErrorWithMessage(err) ? err.response.data.message : 'Google authentication failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const setAuthToken = (token: string) => {
    dispatch({ type: 'SET_TOKEN_AUTHENTICATED', payload: token });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, googleAuth, setAuthToken, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

//Export the useAuth hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
