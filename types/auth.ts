import { AppError } from './AppError';

export interface AuthUser {
  readonly uid: string;
  readonly email: string | null;
  readonly userName: string | null;
}

interface AuthResponse<TData> {
  error: AppError | null;
  data: TData | null;
}

export interface SignInSuccessData {
  user: AuthUser;
}

export interface AuthStatusSuccessData {
  isLoggedIn: boolean;
}

export interface SignOutSuccessData {
  isSignedOut: boolean;
}

export type SignInResponse = AuthResponse<SignInSuccessData>;
export type AuthStatusResponse = AuthResponse<AuthStatusSuccessData>;
export type SignOutResponse = AuthResponse<SignOutSuccessData>;

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  userName: string;
  email: string;
  password: string;
}
