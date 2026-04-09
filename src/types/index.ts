export interface User {
  id: number;
  name: string;
  email: string | null;
  mobile_number: string | null;
  status: "active" | "blocked" | "disabled";
  otp_verify: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface AuthData {
  user: User;
  token: string;
  expires_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  email?: string;
  mobile_number?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  meta: {
    timestamp: string;
    request_id: string | null;
  };
}

export type AuthResponse = ApiResponse<AuthData>;
