import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { PATH } from '@/constants';
import AuthenticatedPage from '@/app/components/AuthenticatedPage';

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');

  return {
    ...original,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('@/app/hooks', () => ({
  useAuth: vi.fn(),
}));

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

  const mockMainAuthTranslations = {
    MAIN_AUTH: {
      greeting: `Hello, {userName}`,
      restful_link: 'RESTful Client',
      graphql_link: 'GraphQL Client',
      history_link: 'History',
    },
  };

  mockMessages = {
    ...messages,
    ...mockMainAuthTranslations,
  };
});

describe('AuthenticatedPage', () => {
  it('renders the correct greeting with the user name', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <AuthenticatedPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Hello, Test User')).toBeInTheDocument();
  });

  it('renders links with correct text and href attributes', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <AuthenticatedPage />
      </NextIntlClientProvider>
    );

    const restfulLink = screen.getByRole('link', { name: 'RESTful Client' });
    expect(restfulLink).toBeInTheDocument();
    expect(restfulLink).toHaveAttribute('href', PATH.RESTFUL_CLIENT);

    const graphqlLink = screen.getByRole('link', { name: 'GraphQL Client' });
    expect(graphqlLink).toBeInTheDocument();
    expect(graphqlLink).toHaveAttribute('href', PATH.GRAPHQL_CLIENT);

    const historyLink = screen.getByRole('link', { name: 'History' });
    expect(historyLink).toBeInTheDocument();
    expect(historyLink).toHaveAttribute('href', PATH.HISTORY);
  });

  it('renders default greeting when user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <AuthenticatedPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Hello,')).toBeInTheDocument();
  });

  it('applies the correct styles to the links', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <AuthenticatedPage />
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
