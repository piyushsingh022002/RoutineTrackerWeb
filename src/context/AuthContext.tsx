import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://studentroutinetrackerapi.onrender.com/api';

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

function isAxiosErrorWithMessage(err: unknown): err is { response: { data: { message: string } } } {
  if (!isObject(err)) return false;
  const response = err.response;
  if (!isObject(response)) return false;
  const data = response.data;
  if (!isObject(data)) return false;
  return typeof data.message === 'string';
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
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
        const res = await axios.get(`${API_URL}/auth/user`);
        dispatch({ type: 'LOAD_USER_SUCCESS', payload: res.data.data });
      } catch {
        dispatch({ type: 'LOAD_USER_FAIL' });
      }
    };
    loadUser();
  }, [state.token]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
    } catch (err: unknown) {
      const errorMessage = isAxiosErrorWithMessage(err) ? err.response.data.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, credentials);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data.data });
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
