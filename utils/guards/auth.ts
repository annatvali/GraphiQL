import {
  AuthStatusResponse,
  AuthStatusSuccessData,
  AuthUser,
  SignInResponse,
  SignInSuccessData,
  SignOutResponse,
  SignOutSuccessData,
} from '@/types';
import { FirebaseError } from 'firebase/app';
import { AppError } from '@/types';

export const isAppError = (error: unknown): error is AppError => {
  return (
    error instanceof AppError ||
    error instanceof FirebaseError ||
    (typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string' &&
      'message' in error &&
      typeof error.message === 'string')
  );
};

export const isAuthUser = (user: unknown): user is AuthUser => {
  return (
    typeof user === 'object' &&
    user !== null &&
    'uid' in user &&
    typeof user.uid === 'string' &&
    'email' in user &&
    (user.email === null || typeof user.email === 'string') &&
    'userName' in user &&
    (user.userName === null || typeof user.userName === 'string')
  );
};

const isSignInSuccessData = (data: unknown): data is SignInSuccessData => {
  return typeof data === 'object' && data !== null && 'user' in data && isAuthUser(data.user);
};

const isSignOutSuccessData = (data: unknown): data is SignOutSuccessData => {
  return typeof data === 'object' && data !== null && 'isSignedOut' in data && typeof data.isSignedOut === 'boolean';
};

const isAuthStatusSuccessData = (data: unknown): data is AuthStatusSuccessData => {
  return typeof data === 'object' && data !== null && 'isLoggedIn' in data && typeof data.isLoggedIn === 'boolean';
};

export const isSignInResponse = (response: unknown): response is SignInResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'error' in response &&
    ((response.error === null && isSignInSuccessData(response.data)) ||
      (response.data === null && isAppError(response.error)))
  );
};

export const isSignOutResponse = (response: unknown): response is SignOutResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'error' in response &&
    ((response.error === null && isSignOutSuccessData(response.data)) ||
      (response.data === null && isAppError(response.error)))
  );
};

export const isAuthStatusResponse = (response: unknown): response is AuthStatusResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'error' in response &&
    ((response.error === null && isAuthStatusSuccessData(response.data)) ||
      (response.data === null && isAppError(response.error)))
  );
};
