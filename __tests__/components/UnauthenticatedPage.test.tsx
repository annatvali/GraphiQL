import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { PATH } from '@/constants';
import UnauthenticatedPage from '@/app/components/UnauthenticatedPage';

vi.mock('@/navigation', async () => {
  const original = await vi.importActual('@/navigation');

  return {
    ...original,
    Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  };
});

let mockMessages: IntlMessages;

const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockMainUnauthTranslations = {
    MAIN_UNAUTH: {
      greeting: 'Welcome to Our Service',
      descr: 'Please sign in or register to continue.',
      signin_link: 'Sign In',
      signup_link: 'Sign Up',
    },
  };

  mockMessages = {
    ...messages,
    ...mockMainUnauthTranslations,
  };
});

describe('UnauthenticatedPage', () => {
  it('renders the greeting and description text', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <UnauthenticatedPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Welcome to Our Service')).toBeInTheDocument();
    expect(screen.getByText('Please sign in or register to continue.')).toBeInTheDocument();
  });

  it('renders ButtonLink components with correct hrefs and text', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <UnauthenticatedPage />
      </NextIntlClientProvider>
    );

    const signInLink = screen.getByRole('link', { name: 'Sign In' });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', PATH.LOGIN);

    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', PATH.REGISTER);
  });

  it('applies the correct styles to the links', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <UnauthenticatedPage />
      </NextIntlClientProvider>
    );

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass(
        'bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light font-light text-xl p-2.5 rounded-[20px]'
      );
    });
  });
});
