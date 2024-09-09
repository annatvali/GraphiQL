import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from './i18n.config';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
