import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthStatusResponse } from '@/utils/guards';
import {
  API_ROUTE,
  HTTP_STATUS_CODE,
  PATH,
  PROTECTED_ROUTES_REGEXP,
  SESSION_COOKIE,
  UNAUTHENTICATED_ROUTES_REGEXP,
} from '@/constants';
import { getBasePathPart } from './utils';

export const authMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const pathBasePart = getBasePathPart(url);

  if (pathBasePart === PATH.MAIN) {
    return;
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE.NAME);

  if (!sessionCookie && PROTECTED_ROUTES_REGEXP.test(pathBasePart)) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  const apiUrl = new URL(API_ROUTE.AUTH_STATUS, url).toString();

  const authResponse = await fetch(apiUrl, {
    headers: {
      Cookie: `${SESSION_COOKIE.NAME}=${sessionCookie?.value}`,
    },
  });

  const dataResponse: unknown = await authResponse.json();

  if (authResponse.status !== HTTP_STATUS_CODE.OK || !isAuthStatusResponse(dataResponse)) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  const { data } = dataResponse;
  const isAuthenticated = data?.isLoggedIn ?? false;

  if (
    (!isAuthenticated && PROTECTED_ROUTES_REGEXP.test(pathBasePart)) ||
    (isAuthenticated && UNAUTHENTICATED_ROUTES_REGEXP.test(pathBasePart))
  ) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  return;
};
