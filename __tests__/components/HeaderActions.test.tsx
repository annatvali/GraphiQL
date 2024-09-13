import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { useRouter } from '@/navigation';
import { PATH } from '@/constants';
import HeaderActions from '@/app/components/HeaderActions';

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
  const pushMock = vi.fn();

  return {
    ...original,
    useRouter: vi.fn(() => ({
      push: pushMock,
      replace: vi.fn(),
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

  const mockHeaderTranslations = {
    HEADER: {
      signout: 'Sign Out',
      signin: 'Sign In',
      signup: 'Sign Up',
    },
  };

  mockMessages = {
    ...messages,
    ...mockHeaderTranslations,
  };
});

describe('HeaderActions', () => {
  it('renders sign out button for authenticated users', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HeaderActions isMenuOpen={false} closeMenu={vi.fn()} />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Sign In/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Sign Up/i })).not.toBeInTheDocument();
  });

  it('renders sign in and sign up buttons for unauthenticated users', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HeaderActions isMenuOpen={false} closeMenu={vi.fn()} />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Sign Out/i })).not.toBeInTheDocument();
  });

  it('calls signOut and redirects when sign out button is clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      signIn,
      signUp,
      signOut,
    });

    const signOutMock = useAuth().signOut;
    const pushMock = useRouter().push;

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HeaderActions isMenuOpen={false} closeMenu={vi.fn()} />
      </NextIntlClientProvider>
    );

    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });

    await user.click(signOutButton);

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith(PATH.MAIN);
    });
  });

  it('applies correct classes based on menu state when isMenuOpen is false', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HeaderActions isMenuOpen={false} closeMenu={vi.fn()} />
      </NextIntlClientProvider>
    );

    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });

    expect(signOutButton).not.toHaveClass('w-full');
  });

  it('applies correct classes based on menu state when isMenuOpen is true', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      signIn,
      signUp,
      signOut,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HeaderActions isMenuOpen={true} closeMenu={vi.fn()} />
      </NextIntlClientProvider>
    );

    const signOutButton = screen.getByRole('button', { name: /Sign Out/i });

    expect(signOutButton).toHaveClass('w-full');
  });
});
