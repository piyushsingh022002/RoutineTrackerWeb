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
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_USER_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_FAIL' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
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
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      //if token exist or changes, it will update the header
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      //if there is no token, it will delete the header
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  useEffect(() => {
    const loadUser = async () => {
      if (!state.token) {
        dispatch({ type: 'LOAD_USER_FAIL' });
        return;
      }
      try {
        const res = await axios.get(`${API_URL}/auth/user`, {
          headers: {
            'X-Client-Id': 'web-ui-v1.0',
          },
        });
        dispatch({ type: 'LOAD_USER_SUCCESS', payload: res.data });
      } catch {
        dispatch({ type: 'LOAD_USER_FAIL' });
      }
    };
    loadUser();
  }, [state.token]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'X-Client-Id': 'web-ui-v1.0',
        },
      });
      
      if (res.status !== 200) {
        const errorMessage = 'Email not found, please register first to login';
        dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
        throw new Error(errorMessage);
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err: unknown) {
      let errorMessage = 'Login failed';
      
      // Check for 401 Unauthorized
      if (isAxiosErrorWithMessage(err) && err.response.status === 401) {
        errorMessage = 'Email not found, please register first to login';
      } else if (isAxiosErrorWithMessage(err)) {
        errorMessage = err.response.data.message;
      }
      
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  //Register User Here 
  const register = async (credentials: RegisterCredentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials, {
        headers: {
          'X-Client-Id': 'web-ui-v1.0',
        },
      });
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data});
    } catch (err: unknown) {
      const errorMessage = isAxiosErrorWithMessage(err) ? err.response.data.message : 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

//Export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
