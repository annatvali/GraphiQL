import { NextResponse } from 'next/server';
import { getSessionCookie, deleteSessionCookie } from '@/lib/cookies';
import { revokeRefreshTokens } from '@/lib/firebase/server';
import { FirebaseError } from 'firebase/app';
import { SignOutResponse } from '@/types';
import { isAuthError } from '@/utils/guards';
import { APP_ERROR_CODE, HTTP_STATUS_CODE, SESSION_COOKIE_NAME } from '@/constants';

export const GET = async (): Promise<NextResponse<SignOutResponse>> => {
  try {
    const sessionCookie = getSessionCookie();

    if (!sessionCookie) {
      throw new FirebaseError(APP_ERROR_CODE.SESSION_NOT_FOUND, 'Session not found.');
    }

    deleteSessionCookie();
    await revokeRefreshTokens(sessionCookie);

    const response = NextResponse.json<SignOutResponse>({
      error: null,
      data: {
        isSignedOut: true,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      path: '/',
    });

    return response;
  } catch (err) {
    const error = isAuthError(err)
      ? err
      : new FirebaseError(APP_ERROR_CODE.UNKNOWN_ERROR, 'An unexpected error occurred during logout.');

    return NextResponse.json<SignOutResponse>({ data: null, error }, { status: HTTP_STATUS_CODE.BAD_REQUEST });
  }
};
