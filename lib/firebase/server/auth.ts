import { UserRecord } from 'firebase-admin/auth';
import { getSessionCookie } from '@/lib/cookies';
import { AuthUser } from '@/types';
import { rethrowError } from '@/utils';
import { firebaseAdminAuth } from './config';

const mapUserRecordToAuthUser = ({ uid, email, displayName }: UserRecord): AuthUser => ({
  uid,
  email: email ?? null,
  userName: displayName ?? null,
});

const getVerifiedUserUid = async (): Promise<string | null> => {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) return null;

  try {
    const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(sessionCookie, true);

    return decodedIdToken.uid;
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to verify session cookie.' });
    return null;
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const uid = await getVerifiedUserUid();

  if (!uid) return null;

  try {
    const currentUser = await firebaseAdminAuth.getUser(uid);

    return mapUserRecordToAuthUser(currentUser);
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to get user data.' });
    return null;
  }
};

export const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    const uid = await getVerifiedUserUid();

    return !!uid;
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to get user status.' });
    return false;
  }
};

export const getUserByUid = async (userUid: string): Promise<AuthUser | null> => {
  if (!userUid) return null;

  try {
    const userRecord = await firebaseAdminAuth.getUser(userUid);

    return mapUserRecordToAuthUser(userRecord);
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to get user by uid.' });
    return null;
  }
};
