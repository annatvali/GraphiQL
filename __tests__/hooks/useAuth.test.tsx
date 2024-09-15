import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { AuthContext } from '@/app/context';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import { useAuth } from '@/app/hooks';

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('@/lib/firebase/client/auth', () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
}));

describe('useAuth', () => {
  const mockSetUser = vi.fn();
  const mockUser = { uid: '123', userName: 'Test User', email: 'test@test.com' };
  const contextValue = { user: mockUser, setUser: mockSetUser };

  const TestComponent = () => {
    const auth = useAuth();

    return (
      <div>
        <div data-testid="user">{auth.user ? 'User exists' : 'No user'}</div>
        <button onClick={() => auth.setUser({ uid: 'newUid', userName: 'New User', email: 'new@example.com' })}>
          Set User
        </button>
        <button onClick={() => void auth.signIn({ email: 'test@test.com', password: 'Password123!' })}>Sign In</button>
        <button
          onClick={() => void auth.signUp({ userName: 'Test User', email: 'test@test.com', password: 'Password123!' })}
        >
          Sign Up
        </button>
        <button onClick={() => void auth.signOut()}>Sign Out</button>
      </div>
    );
  };

  it('should throw an error if used outside of AuthContextProvider', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const Wrapper = () => (
      <React.StrictMode>
        <TestComponent />
      </React.StrictMode>
    );

    expect(() => render(<Wrapper />)).toThrow('useAuth must be used within a AuthContextProvider');

    consoleErrorMock.mockRestore();
  });

  it('should return user, setUser, signIn, signUp, and signOut from context', () => {
    const Wrapper = () => (
      <AuthContext.Provider value={contextValue}>
        <TestComponent />
      </AuthContext.Provider>
    );

    render(<Wrapper />);

    expect(screen.getByTestId('user')).toHaveTextContent('User exists');

    act(() => {
      screen.getByText('Set User').click();
    });
    expect(mockSetUser).toHaveBeenCalledWith({ uid: 'newUid', email: 'new@example.com', userName: 'New User' });

    act(() => {
      screen.getByText('Sign In').click();
    });
    expect(signIn).toHaveBeenCalled();

    act(() => {
      screen.getByText('Sign Up').click();
    });
    expect(signUp).toHaveBeenCalled();

    act(() => {
      screen.getByText('Sign Out').click();
    });
    expect(signOut).toHaveBeenCalled();
  });
});
