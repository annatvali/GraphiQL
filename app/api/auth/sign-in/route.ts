import { NextRequest, NextResponse } from 'next/server';
import { FirebaseError } from 'firebase/app';
import { SignInResponse } from '@/types';
import { createSessionCookie, getCurrentUser, revokeRefreshTokens, setSessionCookie } from '@/lib/firebase/server';
import { isAuthError } from '@/utils/guards';
import { APP_ERROR_CODE, SESSION_COOKIE_NAME } from '@/constants';
import { parseBearerToken } from './parseBearerToken';

export const POST = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get('Authorization');

    const idToken = parseBearerToken(authHeader);

    const expiresIn = 60 * 60 * 1000;

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });
    setSessionCookie(sessionCookie, expiresIn);

    await revokeRefreshTokens(sessionCookie);

    const user = await getCurrentUser();

    if (!user) {
      throw new FirebaseError(APP_ERROR_CODE.USER_NOT_FOUND, 'Failed to retrieve user information after signing in.');
    }

    const response = NextResponse.json<SignInResponse>({
      error: null,
      data: {
        user,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
    });

    return response;
  } catch (err) {
    const error = isAuthError(err) ? err : new FirebaseError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to sign in.');

    return NextResponse.json<SignInResponse>(
      {
        error,
        data: null,
      },
      { status: 400 }
    );
  }
};
