export interface AuthError {
  code: string;
  message: string;
}

export interface AuthUser {
  readonly uid: string;
  readonly email: string | null;
  readonly userName: string | null;
}

interface AuthResponse<TData> {
  error: AuthError | null;
  data: TData | null;
}

export interface SignInSuccessData {
  user: AuthUser;
}

export interface AuthCheckSuccessData {
  isLoggedIn: boolean;
}

export interface SignOutSuccessData {
  isSignedOut: boolean;
}

export type SignInResponse = AuthResponse<SignInSuccessData>;
export type AuthCheckResponse = AuthResponse<AuthCheckSuccessData>;
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
