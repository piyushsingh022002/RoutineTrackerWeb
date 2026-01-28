import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://recotrackapi.onrender.com/api';

interface ApiError {
  message: string;
  error?: string;
}

/**
 * Centralized POST helper for auth password APIs
 * Automatically attaches required headers and normalizes responses
 */
const authPasswordPost = async <T = unknown>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axios.post<T>(
      `${API_URL}${endpoint}`,
      data,
      {
        headers: {
          'X-Client-Id': 'web-ui-v1.0',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    // Normalize API errors
    const axiosError = error as AxiosError<ApiError>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      'An error occurred. Please try again.';
    throw new Error(errorMessage);
  }
};

// API Response Types
export interface SendOtpResponse {
  message: string;
  expiresAtUtc: string;
}

export interface VerifyOtpResponse {
  message: string;
  successCode: string;
}

export interface ResetPasswordResponse {
  token: string;
  username: string;
  email: string;
}

/**
 * Send OTP to email for password reset
 */
export const sendOtp = (email: string): Promise<SendOtpResponse> => {
  return authPasswordPost<SendOtpResponse>('/Auth/password/send-otp', { email });
};

/**
 * Verify OTP code
 */
export const verifyOtp = (email: string, otp: string): Promise<VerifyOtpResponse> => {
  return authPasswordPost<VerifyOtpResponse>('/Auth/password/verify-otp', { email, otp });
};

/**
 * Reset password with verified code
 */
export const resetPassword = (
  email: string,
  successCode: string,
  newPassword: string,
  confirmPassword: string
): Promise<ResetPasswordResponse> => {
  return authPasswordPost<ResetPasswordResponse>('/Auth/password/reset', {
    email,
    successCode,
    newPassword,
    confirmPassword,
  });
};
