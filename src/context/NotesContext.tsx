import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import type { Note } from '../types';
import { useAuth } from './AuthContext';

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'https://studentroutinetrackerapi.onrender.com/api';

// Notes state interface
interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
}

// Initial notes state
const initialState: NotesState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
};

// Notes action types
type NotesAction =
  | { type: 'GET_NOTES_REQUEST' }
  | { type: 'GET_NOTES_SUCCESS'; payload: Note[] }
  | { type: 'GET_NOTES_FAILURE'; payload: string }
  | { type: 'GET_NOTE_REQUEST' }
  | { type: 'GET_NOTE_SUCCESS'; payload: Note }
  | { type: 'GET_NOTE_FAILURE'; payload: string }
  | { type: 'CREATE_NOTE_REQUEST' }
  | { type: 'CREATE_NOTE_SUCCESS'; payload: Note }
  | { type: 'CREATE_NOTE_FAILURE'; payload: string }
  | { type: 'UPDATE_NOTE_REQUEST' }
  | { type: 'UPDATE_NOTE_SUCCESS'; payload: Note }
  | { type: 'UPDATE_NOTE_FAILURE'; payload: string }
  | { type: 'DELETE_NOTE_REQUEST' }
  | { type: 'DELETE_NOTE_SUCCESS'; payload: string }
  | { type: 'DELETE_NOTE_FAILURE'; payload: string }
  | { type: 'CLEAR_CURRENT_NOTE' }
  | { type: 'CLEAR_ERROR' };

// Notes reducer
const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'GET_NOTES_REQUEST':
    case 'GET_NOTE_REQUEST':
    case 'CREATE_NOTE_REQUEST':
    case 'UPDATE_NOTE_REQUEST':
    case 'DELETE_NOTE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'GET_NOTES_SUCCESS':
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
      };
    case 'GET_NOTE_SUCCESS':
      return {
        ...state,
        currentNote: action.payload,
        isLoading: false,
      };
    case 'CREATE_NOTE_SUCCESS':
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        currentNote: action.payload,
        isLoading: false,
      };
    case 'UPDATE_NOTE_SUCCESS':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
        currentNote: action.payload,
        isLoading: false,
      };
    case 'DELETE_NOTE_SUCCESS':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id.toString() !== action.payload),
        currentNote: null,
        isLoading: false,
      };
    case 'GET_NOTES_FAILURE':
    case 'GET_NOTE_FAILURE':
    case 'CREATE_NOTE_FAILURE':
    case 'UPDATE_NOTE_FAILURE':
    case 'DELETE_NOTE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_CURRENT_NOTE':
      return {
        ...state,
        currentNote: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Notes context type
interface NotesContextType extends NotesState {
  getNotes: () => Promise<void>;
  getNote: (id: string) => Promise<void>;
  // Return the created note so callers can await and receive the saved resource
  createNote: (note: Partial<Note>) => Promise<Note>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearCurrentNote: () => void;
  clearError: () => void;
}

// Create notes context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Notes provider component
export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { isAuthenticated } = useAuth();

  const getNotes = React.useCallback(async () => {
    if (!isAuthenticated) return;

    dispatch({ type: 'GET_NOTES_REQUEST' });
    try {
      const res = await axios.get(`${API_URL}/Notes`);
      dispatch({ type: 'GET_NOTES_SUCCESS', payload: res.data});
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to fetch notes');
      dispatch({ type: 'GET_NOTES_FAILURE', payload: errorMessage });
    }
  }, [isAuthenticated]);

  const getNote = React.useCallback(async (id: string) => {
    dispatch({ type: 'GET_NOTE_REQUEST' });
    try {

      const res = await axios.get(`${API_URL}/${id}`);
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: res.data.data });
      // Use the notes endpoint and support APIs that return the resource
      // either as res.data.data or res.data
      const res = await axios.get(`${API_URL}/notes/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const resData = (res && ((res as unknown) as Record<string, unknown>).data) as unknown;
      const payload = (resData && (resData as Record<string, unknown>).data) ?? resData;
      const note: Note = payload as Note;
      dispatch({ type: 'GET_NOTE_SUCCESS', payload: note });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to fetch note');
      dispatch({ type: 'GET_NOTE_FAILURE', payload: errorMessage });
    }
  }, [token]);

  const createNote = React.useCallback(async (note: Partial<Note>) => {
    dispatch({ type: 'CREATE_NOTE_REQUEST' });
    try {
      const res = await axios.post(`${API_URL}/Notes`, note, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      // Support APIs that return the created resource as res.data.data or res.data
      const resData = (res && ((res as unknown) as Record<string, unknown>).data) as unknown;
      const payload = (resData && (resData as Record<string, unknown>).data) ?? resData;
      const created: Note = payload as Note;
      dispatch({ type: 'CREATE_NOTE_SUCCESS', payload: created });
      return created;
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to create note');
      dispatch({ type: 'CREATE_NOTE_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, [token]);

  const updateNote = React.useCallback(async (id: string, note: Partial<Note>) => {
    dispatch({ type: 'UPDATE_NOTE_REQUEST' });
    try {
      const res = await axios.put(`${API_URL}/notes/${id}`, note);
      dispatch({ type: 'UPDATE_NOTE_SUCCESS', payload: res.data.data });
      const res = await axios.put(`${API_URL}/notes/${id}`, note, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      // Normalize response: support APIs that return the updated resource as res.data.data or res.data
      const resData = (res && ((res as unknown) as Record<string, unknown>).data) as unknown;
      const payload = (resData && (resData as Record<string, unknown>).data) ?? resData;
      const updated: Note = payload as Note;
      dispatch({ type: 'UPDATE_NOTE_SUCCESS', payload: updated });

    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to update note');
      dispatch({ type: 'UPDATE_NOTE_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, [token]);

  const deleteNote = React.useCallback(async (id: string) => {
    dispatch({ type: 'DELETE_NOTE_REQUEST' });
    try {
      await axios.delete(`${API_URL}/notes/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      dispatch({ type: 'DELETE_NOTE_SUCCESS', payload: id });
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to delete note');
      dispatch({ type: 'DELETE_NOTE_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  }, [token]);

  const clearCurrentNote = () => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  useEffect(() => {
    if (isAuthenticated) {
      getNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <NotesContext.Provider
      value={{
        ...state,
        getNotes,
        getNote,
        createNote,
        updateNote,
        deleteNote,
        clearCurrentNote,
        clearError,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

// ✅ Safe error helper function
function getErrorMessage(err: unknown, fallback: string): string {
  if (typeof err === 'object' && err !== null) {
    // Use a type guard to check if 'response' property exists and is an object
    const maybeError = err as Record<string, unknown>;
    if (
      'response' in maybeError &&
      typeof maybeError.response === 'object' &&
      maybeError.response !== null
    ) {
      const response = maybeError.response as Record<string, unknown>;
      if (
        'data' in response &&
        typeof response.data === 'object' &&
        response.data !== null
      ) {
        const data = response.data as Record<string, unknown>;
        if (
          'message' in data &&
          typeof data.message === 'string'
        ) {
          return data.message;
        }
      }
    }
  }
  return fallback;
}

