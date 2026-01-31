export interface AuthResponse {
  token: string;
  message: string;
}

export interface AuthContextType {
  user: AuthResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}