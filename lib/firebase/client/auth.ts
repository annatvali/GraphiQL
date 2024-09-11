import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
  User,
} from 'firebase/auth';
import { AuthUser, SignInRequest, SignInSuccessData, SignUpRequest } from '@/types';
import { isSignInResponse, isSignOutResponse } from '@/utils/guards';
import { API_ROUTE } from '@/constants';
import { firebaseClientAuth } from './config';

const getUserData = async (user: User): Promise<SignInSuccessData | undefined> => {
  try {
    const idToken = await user.getIdToken();

    const response = await fetch(API_ROUTE.SIGN_IN, {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${idToken}`, 'Content-Type': 'application/json' }),
    });

    if (!response.ok) return;

    const resBody: unknown = await response.json();

    if (!isSignInResponse(resBody)) return;

    const { data, error } = resBody;

    if (error || !data) return;

    return data;
  } catch {
    return;
  }
};

export const signIn = async ({ email, password }: SignInRequest): Promise<AuthUser | undefined> => {
  try {
    const { user } = await signInWithEmailAndPassword(firebaseClientAuth, email, password);

    const data = await getUserData(user);

    if (!data) return;

    return data.user;
  } catch {
    return;
  }
};

export const signOut = async (): Promise<boolean> => {
  try {
    await signOutFirebase(firebaseClientAuth);

    const response = await fetch(API_ROUTE.SIGN_OUT, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return false;

    const resBody: unknown = await response.json();

    if (!isSignOutResponse(resBody)) return false;

    const { data, error } = resBody;

    if (error || !data) return false;

    return true;
  } catch {
    return false;
  }
};

export const signUp = async ({
  userName: displayName,
  email,
  password,
}: SignUpRequest): Promise<AuthUser | undefined> => {
  try {
    const { user } = await createUserWithEmailAndPassword(firebaseClientAuth, email, password);
    await updateProfile(user, { displayName });

    const data = await getUserData(user);

    if (!data) return;

    return data.user;
  } catch {
    return;
  }
};
