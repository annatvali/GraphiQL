import { SessionCookieOptions } from 'firebase-admin/auth';
import { AppError } from '@/types';
import { rethrowError } from '@/utils';
import { APP_ERROR_CODE } from '@/constants';
import { firebaseAdminAuth } from './config';

const recentLoginThresholdSeconds = 5 * 60;

export const createSessionCookie = async (
  idToken: string,
  sessionCookieOptions: SessionCookieOptions
): Promise<string | null> => {
  try {
    const decodedIdToken = await firebaseAdminAuth.verifyIdToken(idToken);

    const timeNowSeconds = Math.floor(Date.now() / 1000);

    if (timeNowSeconds - decodedIdToken.auth_time >= recentLoginThresholdSeconds) {
      await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);

      throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Recent sign-in required');
    }

    return await firebaseAdminAuth.createSessionCookie(idToken, sessionCookieOptions);
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to create session cookie.' });
    return null;
  }
};

export const revokeRefreshTokens = async (sessionCookie: string): Promise<void> => {
  try {
    const decodedIdToken = await firebaseAdminAuth.verifySessionCookie(sessionCookie);

    return await firebaseAdminAuth.revokeRefreshTokens(decodedIdToken.sub);
  } catch (error) {
    rethrowError(error, { fallbackMessage: 'Failed to revoke refresh tokens.' });
  }
};
