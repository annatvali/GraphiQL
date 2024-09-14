import { NextResponse } from 'next/server';
import { AppError, AuthStatusResponse } from '@/types';
import { isUserAuthenticated } from '@/lib/firebase/server';
import { isAppError } from '@/utils/guards';
import { APP_ERROR_CODE, HTTP_STATUS_CODE } from '@/constants';

export const GET = async (): Promise<NextResponse<AuthStatusResponse>> => {
  try {
    const isLoggedIn = await isUserAuthenticated();

    return NextResponse.json<AuthStatusResponse>(
      {
        error: null,
        data: {
          isLoggedIn,
        },
      },
      { status: HTTP_STATUS_CODE.OK }
    );
  } catch (err) {
    const error = isAppError(err) ? err : new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to check user status.');

    return NextResponse.json<AuthStatusResponse>(
      {
        error: { ...error, message: error.message },
        data: null,
      },
      { status: HTTP_STATUS_CODE.OK }
    );
  }
};
