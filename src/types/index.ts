export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    avatarUrl: string | null;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Note {
  id: string | number;
  userId: string | number;
  title: string;
  content: string;
  tags: string[];
  mediaUrls: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Notification {
  id: number;
  userId: string | number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: number;
  userId: string | number;
  date: string;
  hasNote: boolean;
  streakCount: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  dob: string; // ISO date string
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
