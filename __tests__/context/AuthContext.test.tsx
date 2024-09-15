import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useContext } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { AuthContextProvider, AuthContext } from '@/app/context/AuthContext';

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');
  const onIdTokenChangedMock = vi.fn().mockReturnValue(vi.fn());
  const signOutMock = vi.fn();

  return {
    ...original,
    getAuth: vi.fn().mockReturnValue({}),
    onIdTokenChanged: onIdTokenChangedMock,
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: signOutMock,
    updateProfile: vi.fn(),
  };
});

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');
  const signOutMock = vi.fn();

  return {
    ...original,
    signIn: vi.fn(),
    signUp: signOutMock,
    signOut: vi.fn(),
    setUser: vi.fn(),
  };
});

vi.mock('@/lib/firebase/client/config', () => ({
  firebaseClientAuth: vi.fn(),
}));

vi.mock('@/lib/firebase/client', () => {
  const signOutServerMock = vi.fn();

  return {
    getAuthStatus: vi.fn(),
    signOutServer: signOutServerMock,
  };
});

vi.useFakeTimers();

const AuthConsumer = () => {
  const { user, setUser } = useContext(AuthContext)!;
  return (
    <>
      <div>User email: {user?.email}</div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Sign Out
      </button>
    </>
  );
};

describe('AuthContextProvider', () => {
  it('should initialize with the provided user state', () => {
    const mockUser = { uid: '123', email: 'test@test.com', userName: 'Test User' };

    render(
      <AuthContextProvider user={mockUser}>
        <AuthConsumer />
      </AuthContextProvider>
    );

    expect(screen.getByText(/User email: test@test.com/i)).toBeInTheDocument();
  });

  it('should unsubscribe from onIdTokenChanged on unmount', () => {
    const unsubscribe = vi.fn();
    vi.mocked(onIdTokenChanged).mockImplementation(() => unsubscribe);

    const { unmount } = render(
      <AuthContextProvider>
        <div>Test</div>
      </AuthContextProvider>
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});
