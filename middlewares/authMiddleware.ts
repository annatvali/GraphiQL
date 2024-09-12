import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from '@/i18n.config';
import { API_ROUTE, HTTP_STATUS_CODE, PATH, ROUTES, SESSION_COOKIE_NAME } from '@/constants';

const localePrefix = locales.join('|');
const localePrefixRegex = new RegExp(`^/(${localePrefix})/`);

export const authMiddleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const pathWithoutLocale = pathname.replace(localePrefixRegex, '/');

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie && ROUTES.PROTECTED.includes(pathWithoutLocale)) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  const apiUrl = new URL(API_ROUTE.SIGN_IN, url).toString();

  const authResponse = await fetch(apiUrl, {
    headers: {
      Cookie: `${SESSION_COOKIE_NAME}=${sessionCookie?.value}`,
    },
  });

  const isAuthenticated = authResponse.status === HTTP_STATUS_CODE.OK;

  if (
    (!isAuthenticated && ROUTES.PROTECTED.includes(pathWithoutLocale)) ||
    (isAuthenticated && ROUTES.UNAUTHENTICATED.includes(pathWithoutLocale))
  ) {
    url.pathname = PATH.MAIN;
    return NextResponse.redirect(url);
  }

  return undefined;
};
