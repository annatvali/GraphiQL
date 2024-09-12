import { NextResponse } from 'next/server';
import { FirebaseError } from 'firebase/app';
import { AuthStatusResponse } from '@/types';
import { isUserAuthenticated } from '@/lib/firebase/server';
import { isAuthError } from '@/utils/guards';
import { APP_ERROR_CODE, HTTP_STATUS_CODE } from '@/constants';

export const GET = async (): Promise<NextResponse<AuthStatusResponse>> => {
  try {
    const isLoggedIn = await isUserAuthenticated();

    const statusCode = isLoggedIn ? HTTP_STATUS_CODE.OK : HTTP_STATUS_CODE.UNAUTHORIZED;

    return NextResponse.json<AuthStatusResponse>(
      {
        error: null,
        data: {
          isLoggedIn,
        },
      },
      { status: statusCode }
    );
  } catch (err) {
    const error = isAuthError(err)
      ? err
      : new FirebaseError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to check user status.');

    return NextResponse.json<AuthStatusResponse>(
      {
        error,
        data: null,
      },
      { status: HTTP_STATUS_CODE.BAD_REQUEST }
    );
  }
};