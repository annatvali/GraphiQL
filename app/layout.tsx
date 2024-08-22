import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from './components/Header';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'A lightweight REST/GraphQL client for seamless API interactions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
