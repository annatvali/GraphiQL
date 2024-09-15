import { LocalePrefix } from 'next-intl/routing';

export const locales = ['en', 'ru'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
};

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';
