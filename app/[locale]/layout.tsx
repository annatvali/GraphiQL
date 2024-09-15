import { ReactNode } from 'react';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getCurrentUser } from '@/lib/firebase/server';
import { AuthContextProvider } from '@/app/context';

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

interface LayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Omit<LayoutProps, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'METADATA' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  const messages = await getMessages();

  const user = await getCurrentUser();

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <NextIntlClientProvider messages={messages}>
          <AuthContextProvider user={user}>
            <Header />
            <main className="mt-23">{children}</main>
          </AuthContextProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
