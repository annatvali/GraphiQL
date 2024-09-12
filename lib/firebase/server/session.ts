import { SessionCookieOptions } from 'firebase-admin/auth';
import { firebaseAdminAuth } from './config';

const recentLoginThresholdSeconds = 5 * 60;

export const createSessionCookie = async (
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
): Promise<string> => {
  try {
    const decodedIdToken = await firebaseAdminAuth.verifyIdToken(idToken);

    const timeNowSeconds = Math.floor(Date.now() / 1000);

    if (timeNowSeconds - decodedIdToken.auth_time >= recentLoginThresholdSeconds) {
      await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);

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
