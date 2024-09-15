import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from '@/i18n.config';
import { authMiddleware } from '@/middlewares';

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const middleware = async (request: NextRequest) => {
  const authResponse = await authMiddleware(request);

  if (authResponse) return authResponse;

  return intlMiddleware(request);
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
