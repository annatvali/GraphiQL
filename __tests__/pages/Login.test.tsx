import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithTranslations } from '@/__tests__/test-utils';
import { useRouter } from '@/navigation';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { PATH } from '@/constants';
import Login from '@/app/[locale]/login/page';

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');
  const signInMock = vi.fn().mockResolvedValue({
    data: { user: { uid: '123', userName: 'Test User', email: 'test@test.com' } },
    error: null,
  });

  return {
    ...original,
    signIn: signInMock,
    signUp: vi.fn(),
    signOut: vi.fn(),
    setUser: vi.fn(),
  };
});

vi.mock('@/app/hooks', () => {
  const signInMock = vi.fn().mockResolvedValue({
    data: { user: { uid: '123', userName: 'Test User', email: 'test@test.com' } },
    error: null,
  });

  return {
    useAuth: vi.fn(() => ({
      signIn: signInMock,
      setUser: vi.fn(),
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

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

const mockMessages = {
  SIGN_IN: {
    title: 'Sign In',
    signin_btn: 'Sign In',
    signup_link: 'Create an account',
    descr: 'Don’t have an account?',
    email_label: 'Email',
    psw_label: 'Password',
  },
  VALIDATION: {
    'email-invalid': 'Invalid email address',
    'password-min-length': 'Password is too short',
    'passwords-must-match': 'Passwords do not match',
    'password-must-contain-letter': 'Contain at least one letter.',
    'password-must-contain-digit': 'Contain at least one digit.',
    'password-must-contain-special': 'Contain at least one special character.',
  },
  ERRORS: {
    'auth/invalid-credential': 'Your credentials are invalid or expired',
  },
};

describe('Login', () => {
  it('renders form with fields and translations when not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    renderWithTranslations(<Login />, { messages: mockMessages });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Create an account/i })).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();

    renderWithTranslations(<Login />, { messages: mockMessages });

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, 'short');
    await user.click(screen.getByRole('button', { name: /Sign In/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is too short/i)).toBeInTheDocument();
  });

  it('submits form and redirects', async () => {
    renderWithTranslations(<Login />, { messages: mockMessages });

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

  it('redirects when logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: 'test@test.com' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    const replaceMock = useRouter().replace;

    renderWithTranslations(<Login />, { messages: mockMessages });

    expect(replaceMock).toHaveBeenCalledWith(PATH.MAIN);
  });

  it('sets error state when signIn returns no data', async () => {
    const mockError = {
      name: 'AppError',
      code: 'auth/invalid-credential',
      message: 'Your credentials are invalid or expired',
    };
    const signInMock = vi.fn().mockResolvedValueOnce({
      data: null,
      error: mockError,
    });

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      setUser: vi.fn(),
      signIn: signInMock,
      signUp,
      signOut,
    });

    const user = userEvent.setup();

    renderWithTranslations(<Login />, { messages: mockMessages });

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123!');

    await user.click(signInButton);

    await waitFor(() => {
      expect(useAuth().signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      });
    });

    const errorMessage = await screen.findByText(/Your credentials are invalid or expired/i);
    expect(errorMessage).toBeInTheDocument();

    expect(useAuth().setUser).not.toHaveBeenCalled();
  });
});
