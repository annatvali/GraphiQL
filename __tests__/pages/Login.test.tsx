import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from '@/navigation';
import { useAuth } from '@/app/hooks';
import { PATH, SESSION_COOKIE } from '@/constants';
import Login from '@/app/[locale]/login/page';

vi.mock('@/app/hooks', () => {
  const signInMock = vi.fn().mockResolvedValue({ uid: '123', userName: 'Test User', email: 'test@test.com' });

  return {
    useAuth: () => ({
      signIn: signInMock,
    }),
  };
});

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

  const { SIGN_IN, VALIDATION } = messages;

  const mockSignInTranslations = {
    SIGN_IN: {
      ...SIGN_IN,
      title: 'Sign In',
      signin_btn: 'Sign In',
      signup_link: 'Create an account',
      descr: 'Don’t have an account?',
      email_label: 'Email',
      psw_label: 'Password',
      login_duration: `Session duration: ${Math.floor(SESSION_COOKIE.MAX_AGE_SECONDS / 3600)} hour`,
    },
  };

  const mockValidationTranslations = {
    VALIDATION: {
      ...VALIDATION,
      'email-invalid': 'Invalid email address',
      'password-min-length': 'Password is too short',
    },
  };

  mockMessages = {
    ...messages,
    ...mockSignInTranslations,
    ...mockValidationTranslations,
  };
});

describe('Login', () => {
  it('renders form with fields and translations', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Login />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create an account/i })).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Login />
      </NextIntlClientProvider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'short');
    await user.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is too short/i)).toBeInTheDocument();
  });

  it('submits form and redirects', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Login />
      </NextIntlClientProvider>
    );

    const signInMock = useAuth().signIn;
    const pushMock = useRouter().push;

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    expect(signInButton).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123!');

    expect(signInButton).toBeEnabled();

    await user.click(signInButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      });
      expect(pushMock).toHaveBeenCalledWith(PATH.MAIN);
    });
  });
});
