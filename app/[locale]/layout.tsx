import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { AuthContextProvider } from '@/app/context';
import '@/app/globals.css';

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'RESTful/GraphQL Client',
  description: 'A lightweight REST/GraphQL client for seamless API interactions',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <NextIntlClientProvider messages={messages}>
          <AuthContextProvider>
            <Header />
            <main className="mt-23">{children}</main>
          </AuthContextProvider>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
