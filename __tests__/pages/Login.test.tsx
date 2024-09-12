import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from '@/navigation';
import { PATH, SESSION_COOKIE } from '@/constants';
import Login from '@/app/[locale]/login/page';

vi.mock('@/navigation');

vi.mock('@/app/hooks', () => ({
  useAuth: () => ({
    signIn: vi.fn().mockResolvedValue(true),
  }),
}));

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

  it.todo('submits form and redirects', async () => {
    const { push } = useRouter();

    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Login />
      </NextIntlClientProvider>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    expect(signInButton).toBeDisabled();

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'ValidPassword123&');

    expect(signInButton).toBeEnabled();

    await user.click(signInButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(`${PATH.MAIN}${locale}`);
    });
  });
});
