import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { AppError, AuthStatusResponse, SignInRequest, SignInResponse, SignOutResponse, SignUpRequest } from '@/types';
import { isAuthStatusResponse, isSignInResponse, isSignOutResponse } from '@/utils/guards';
import { API_ROUTE, APP_ERROR_CODE } from '@/constants';
import { firebaseClientAuth } from './config';
import { rethrowError } from '@/utils';

const verifyUser = async (user: User): Promise<SignInResponse> => {
  try {
    const idToken = await user.getIdToken();

    const response = await fetch(API_ROUTE.SIGN_IN, {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' }),
    });

    const resBody: unknown = await response.json();

    if (!isSignInResponse(resBody)) {
      throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'User could not be verified.');
    }

    return resBody;
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Could not verify user' });
    throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'User could not be verified.');
  }
};

export const signIn = async ({ email, password }: SignInRequest): Promise<SignInResponse> => {
  try {
    const { user } = await signInWithEmailAndPassword(firebaseClientAuth, email, password);

    const response = await verifyUser(user);

    return response;
  } catch (err) {
    const error =
      err instanceof FirebaseError || err instanceof AppError
        ? err
        : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to sign in.');

    return {
      data: null,
      error,
    };
  }
};

export const signUp = async ({ userName: displayName, email, password }: SignUpRequest): Promise<SignInResponse> => {
  try {
    const { user } = await createUserWithEmailAndPassword(firebaseClientAuth, email, password);
    await updateProfile(user, { displayName });

    const response = await verifyUser(user);

    return response;
  } catch (err) {
    const error =
      err instanceof FirebaseError || err instanceof AppError
        ? err
        : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to sign up.');

    return {
      data: null,
      error,
    };
  }
};

export const signOutServer = async (): Promise<SignOutResponse> => {
  try {
    const response = await fetch(API_ROUTE.SIGN_OUT, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resBody: unknown = await response.json();

    if (!isSignOutResponse(resBody)) {
      throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Failed to sign out.');
    }

    return resBody;
  } catch (err) {
    const error =
      err instanceof FirebaseError || err instanceof AppError
        ? err
        : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to sign out.');

    return {
      data: null,
      error,
    };
  }
};

export const signOut = async (): Promise<SignOutResponse> => {
  try {
    await signOutFirebase(firebaseClientAuth);

    const resBody = await signOutServer();

    return resBody;
  } catch (err) {
    const error =
      err instanceof FirebaseError || err instanceof AppError
        ? err
        : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to sign out.');

    return {
      data: null,
      error,
    };
  }
};

export const getAuthStatus = async (): Promise<AuthStatusResponse> => {
  try {
    const response = await fetch(API_ROUTE.AUTH_STATUS, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resBody: unknown = await response.json();

    if (!isAuthStatusResponse(resBody)) {
      throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Failed to check authentication status.');
    }

    return resBody;
  } catch (err) {
    const error =
      err instanceof FirebaseError || err instanceof AppError
        ? err
        : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to check authentication status.');

    return {
      data: null,
      error,
    };
  }
};
