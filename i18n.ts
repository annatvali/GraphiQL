import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { AbstractIntlMessages } from 'next-intl';
import { locales, Locale } from './i18n.config';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const { default: messages } = (await import(`./messages/${locale}.json`)) as { default: AbstractIntlMessages };

  return {
    messages,
  };
});
