import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from '@/navigation';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { PATH } from '@/constants';
import Register from '@/app/[locale]/register/page';

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');
  const signUpMock = vi.fn().mockResolvedValue({
    data: { user: { uid: '123', userName: 'Test User', email: 'test@test.com' } },
    error: null,
  });

  return {
    ...original,
    signIn: vi.fn(),
    signUp: signUpMock,
    signOut: vi.fn(),
    setUser: vi.fn(),
  };
});

vi.mock('@/app/hooks', () => {
  const signUpMock = vi.fn().mockResolvedValue({
    data: { user: { uid: '123', userName: 'Test User', email: 'test@test.com' } },
    error: null,
  });

  return {
    useAuth: vi.fn(() => ({
      signUp: signUpMock,
    })),
  };
});

vi.mock('@/navigation', async () => {
  const original = await vi.importActual('@/navigation');
  const pushMock = vi.fn();
  const replaceMock = vi.fn();

  return {
    ...original,
    useRouter: vi.fn(() => ({
      push: pushMock,
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

  const { SIGN_UP, VALIDATION, ERRORS } = messages;

  const mockSignUpTranslations = {
    SIGN_UP: {
      ...SIGN_UP,
      title: 'Sign Up',
      signup_btn: 'Sign Up',
      signin_link: 'Sign In',
      descr: 'Already have an account?',
      username_label: 'Username',
      email_label: 'Email',
      psw_label: 'Password',
      confirm_psw_label: 'Confirm Password',
    },
  };

  const mockValidationTranslations = {
    VALIDATION: {
      ...VALIDATION,
      'user-name-min-length': 'Username is too short',
      'email-invalid': 'Invalid email address',
      'password-min-length': 'Password is too short',
      'confirm-password-match': 'Passwords do not match',
    },
  };

  const mockErrorTranslations = {
    ERRORS: {
      ...ERRORS,
      'auth/email-already-exists': 'This email is already in use',
    },
  };

  mockMessages = {
    ...messages,
    ...mockSignUpTranslations,
    ...mockValidationTranslations,
    ...mockErrorTranslations,
  };
});

describe('Register', () => {
  it('renders form with fields and translations when not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Register />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Register />
      </NextIntlClientProvider>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

    expect(signUpButton).toBeDisabled();

    await user.type(usernameInput, 't');
    await user.type(emailInput, 'test@');
    await user.type(passwordInput, 'Passw');
    await user.type(confirmPasswordInput, 'Password');

    expect(signUpButton).toBeDisabled();

    expect(await screen.findByText(/Username is too short/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is too short/i)).toBeInTheDocument();
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('submits form and redirects on successful submission', async () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Register />
      </NextIntlClientProvider>
    );

    const signUpMock = useAuth().signUp;
    const pushMock = useRouter().push;

    const user = userEvent.setup();

    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

    expect(signUpButton).toBeDisabled();

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123!');
    await user.type(confirmPasswordInput, 'Password123!');

    expect(signUpButton).toBeEnabled();

    await user.click(signUpButton);

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith({
        userName: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
      });
      expect(pushMock).toHaveBeenCalledWith(PATH.MAIN);
    });
  });

  it('redirects when logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    const replaceMock = useRouter().replace;

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Register />
      </NextIntlClientProvider>
    );

    expect(replaceMock).toHaveBeenCalledWith(PATH.MAIN);
  });

  it('sets error state when signUp returns no data', async () => {
    const mockError = { code: 'auth/email-already-exists', message: 'This email is already in use' };
    const signUpMock = vi.fn().mockResolvedValueOnce({
      data: null,
      error: mockError,
    });

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      setUser: vi.fn(),
      signIn,
      signUp: signUpMock,
      signOut,
    });

    const user = userEvent.setup();

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <Register />
      </NextIntlClientProvider>
    );

    const usernameInput = await screen.findByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

    await user.type(usernameInput, 'testuser');
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123!');
    await user.type(confirmPasswordInput, 'Password123!');

    await user.click(signUpButton);

    await waitFor(() => {
      expect(useAuth().signUp).toHaveBeenCalledWith({
        userName: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
      });
    });

    const errorMessage = await screen.findByText(/This email is already in use/i);
    expect(errorMessage).toBeInTheDocument();

    expect(useAuth().setUser).not.toHaveBeenCalled();
  });
});
