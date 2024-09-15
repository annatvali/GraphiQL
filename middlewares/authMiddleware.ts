import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from '@/i18n.config';
import { isAuthStatusResponse } from '@/utils/guards';
import { API_ROUTE, HTTP_STATUS_CODE, PATH, ROUTES, SESSION_COOKIE } from '@/constants';

const localePrefix = locales.join('|');
const localePrefixRegex = new RegExp(`^/(${localePrefix})/`);

export const authMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const pathWithoutLocale = pathname.replace(localePrefixRegex, '/');
  const parts = pathWithoutLocale.split('/');
  const pathBasePart = parts[1];

  if (pathBasePart === PATH.MAIN) {
    return;
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE.NAME);

  if (!sessionCookie && ROUTES.PROTECTED.includes(pathBasePart)) {
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
    (!isAuthenticated && ROUTES.PROTECTED.includes(pathBasePart)) ||
    (isAuthenticated && ROUTES.UNAUTHENTICATED.includes(pathBasePart))
  ) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  return;
};
