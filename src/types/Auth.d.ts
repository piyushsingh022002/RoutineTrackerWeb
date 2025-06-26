export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  id: string;
}

export interface AuthContextType {
  user: AuthResponse | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}