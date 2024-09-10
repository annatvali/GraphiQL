import { UserRecord } from 'firebase-admin/auth';
import { firebaseAdminAuth } from './config';
import { getSessionCookie } from './session';
import { AuthUser } from '@/types';

const mapUserRecordToAuthUser = ({ uid, email, displayName }: UserRecord): AuthUser => ({
  uid,
  email: email ?? null,
  displayName: displayName ?? null,
});

const getVerifiedUserUid = async (): Promise<string | null> => {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) return null;

  try {
    const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(sessionCookie, true);

    return decodedIdToken.uid;
  } catch {
    return null;
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const uid = await getVerifiedUserUid();

  if (!uid) return null;

  try {
    const currentUser = await firebaseAdminAuth.getUser(uid);

    return mapUserRecordToAuthUser(currentUser);
  } catch {
    return null;
  }
};

export const isUserAuthenticated = async (): Promise<boolean> => {
  const uid = await getVerifiedUserUid();

  return !!uid;
};

export const getUserByUid = async (userUid: string): Promise<AuthUser | null> => {
  if (!userUid) return null;

  try {
    const userRecord = await firebaseAdminAuth.getUser(userUid);

    return mapUserRecordToAuthUser(userRecord);
  } catch {
    return null;
  }
};
