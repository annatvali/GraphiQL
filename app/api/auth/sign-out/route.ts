import { NextResponse } from 'next/server';
import { getSessionCookie, deleteSessionCookie } from '@/lib/cookies';
import { revokeRefreshTokens } from '@/lib/firebase/server';
import { AppError, SignOutResponse } from '@/types';
import { isAppError } from '@/utils/guards';
import { APP_ERROR_CODE, HTTP_STATUS_CODE, SESSION_COOKIE } from '@/constants';

export const GET = async (): Promise<NextResponse<SignOutResponse>> => {
  try {
    const sessionCookie = getSessionCookie();

    if (!sessionCookie) {
      throw new AppError(APP_ERROR_CODE.SESSION_NOT_FOUND, 'Session not found.');
    }

    deleteSessionCookie();
    await revokeRefreshTokens(sessionCookie);

    const response = NextResponse.json<SignOutResponse>({
      error: null,
      data: {
        isSignedOut: true,
      },
    });

    response.cookies.set(SESSION_COOKIE.NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      path: '/',
    });

    return response;
  } catch (err) {
    const error = isAppError(err)
      ? err
      : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'An unexpected error occurred during logout.');

    return NextResponse.json<SignOutResponse>(
      { data: null, error: { ...error, message: error.message } },
      { status: HTTP_STATUS_CODE.OK }
    );
  }
};
