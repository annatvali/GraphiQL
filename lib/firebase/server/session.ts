import { cookies } from 'next/headers';
import { SessionCookieOptions } from 'firebase-admin/auth';
import { SESSION_COOKIE_NAME } from '@/constants';
import { firebaseAdminAuth } from './config';

const recentLoginThresholdSeconds = 5 * 60;

export const getSessionCookie = (): string | undefined => {
  const cookieStore = cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
};

export const setSessionCookie = (sessionCookie: string, expiresInMs: number) => {
  const cookieStore = cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: expiresInMs,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
};

export const deleteSessionCookie = (): void => {
  const cookieStore = cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
};

export const createSessionCookie = async (
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
): Promise<string> => {
  try {
    const decodedIdToken = await firebaseAdminAuth.verifyIdToken(idToken);

    const timeNowSeconds = Math.floor(Date.now() / 1000);

    if (timeNowSeconds - decodedIdToken.auth_time >= recentLoginThresholdSeconds) {
      throw new Error('Recent sign-in required');
    }

    return await firebaseAdminAuth.createSessionCookie(idToken, sessionCookieOptions);
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Failed to create session cookie.');

    throw error;
  }
};

export const revokeRefreshTokens = async (sessionCookie: string): Promise<void> => {
  const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(sessionCookie);

  return await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);
};
