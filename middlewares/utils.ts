import { locales } from '@/i18n.config';
import { NextURL } from 'next/dist/server/web/next-url';

const localePrefix = locales.join('|');
const localePrefixRegex = new RegExp(`^/(${localePrefix})/`);

export const getBasePathPart = (url: NextURL): string => {
  const pathname = url.pathname;

  const pathWithoutLocale = pathname.replace(localePrefixRegex, '/');
  const parts = pathWithoutLocale.split('/');
  const pathBasePart = parts[1];

  return pathBasePart;
};
