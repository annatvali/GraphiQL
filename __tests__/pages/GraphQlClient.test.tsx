import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { useRouter } from '@/navigation';
import { PATH } from '@/constants';
import GraphQLClientPage from '@/app/[locale]/GRAPHQL/page';

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');

  return {
    ...original,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('@/app/hooks', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/app/[locale]/loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('@/navigation', async () => {
  const original = await vi.importActual('@/navigation');
  const replaceMock = vi.fn();

  return {
    ...original,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: replaceMock,
      back: vi.fn(),
      prefetch: vi.fn(),
      query: {},
      pathname: '/',
    })),
  };
});

let mockMessages: IntlMessages;
const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockGraphiQlTranslations = {
    GRAPHQL_CLIENT: {
      title: 'GraphQL Client',
      description: 'Explore and interact with GraphQL APIs.',
    },
  };

  mockMessages = {
    ...messages,
    ...mockGraphiQlTranslations,
  };
});

describe('GraphQLClientPage', () => {
  it('renders the title with the correct translation when logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <GraphQLClientPage />
      </NextIntlClientProvider>
    );

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('GraphQL Client');
  });

  it('renders the description with the correct translation when logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <GraphQLClientPage />
      </NextIntlClientProvider>
    );

    const descriptionElement = screen.getByText('Explore and interact with GraphQL APIs.');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('redirects when not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    const replaceMock = useRouter().replace;

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <GraphQLClientPage />
      </NextIntlClientProvider>
    );

    expect(replaceMock).toHaveBeenCalledWith(PATH.MAIN);
  });
});
