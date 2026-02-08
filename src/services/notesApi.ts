import axios, { AxiosError } from 'axios';
import type { Note } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://recotrackapi.onrender.com/api';

interface ApiError {
  message: string;
  error?: string;
}

const getHeaders = (token?: string) => ({
  'X-Client-Id': 'web-ui-v1.0',
  ...(token && { Authorization: `Bearer ${token}` }),
});

const handleError = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<ApiError>;
  return (
    axiosError.response?.data?.message ||
    axiosError.response?.data?.error ||
    fallback
  );
};

/**
 * Fetch favourite notes for the authenticated user
 */
export const getFavouriteNotes = async (token: string): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>(
      `${API_URL}/Notes/favourites`,
      {
        headers: getHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error, 'Failed to fetch favourite notes');
    throw new Error(errorMessage);
  }
};

/**
 * Fetch important notes for the authenticated user
 */
export const getImportantNotes = async (token: string): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>(
      `${API_URL}/Notes/important`,
      {
        headers: getHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error, 'Failed to fetch important notes');
    throw new Error(errorMessage);
  }
};

/**
 * Fetch deleted notes for the authenticated user
 */
export const getDeletedNotes = async (token: string): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>(
      `${API_URL}/Notes/deleted`,
      {
        headers: getHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error, 'Failed to fetch deleted notes');
    throw new Error(errorMessage);
  }
};

/**
 * Fetch notes by status
 */
export const getNotesByStatus = async (
  status: string,
  token: string
): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>(
      `${API_URL}/Notes/status/${status}`,
      {
        headers: getHeaders(token),
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error, `Failed to fetch ${status} notes`);
    throw new Error(errorMessage);
  }
};
