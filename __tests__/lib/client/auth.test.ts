import { describe, expect, it, vi } from 'vitest';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { AppError, SignInRequest, SignUpRequest } from '@/types';
import { API_ROUTE } from '@/constants';
import { verifyUser, signIn, signUp, signOut, signOutServer, getAuthStatus } from '@/lib/firebase/client';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils', () => ({
  rethrowError: vi.fn(),
}));

global.fetch = vi.fn();

describe('Auth Functions', () => {
  describe('verifyUser', () => {
    it('should verify the user and return response', async () => {
      const mockUser = { getIdToken: vi.fn().mockResolvedValue('mockToken') } as unknown as User;
      const mockUserApp = { uid: '123', userName: 'Test User', email: 'test@test.com' };
      const mockResponse = { error: null, data: { user: mockUserApp } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await verifyUser(mockUser);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(API_ROUTE.SIGN_IN, {
        method: 'POST',
        headers: new Headers({ Authorization: `Bearer mockToken`, 'Content-Type': 'application/json' }),
      });
    });

    it('should handle errors properly', async () => {
      const mockUser = { getIdToken: vi.fn().mockResolvedValue('mockToken') } as unknown as User;
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'));

      await expect(verifyUser(mockUser)).rejects.toThrow(AppError);
    });
  });

  describe('signIn', () => {
    it('should sign in the user and return a response', async () => {
      const mockUser = { getIdToken: vi.fn().mockResolvedValue('mockToken') } as unknown as User;
      const mockUserApp = { uid: '123', userName: 'Test User', email: 'test@test.com' };
      const mockResponse = { error: null, data: { user: mockUserApp } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);
      vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
        providerId: '',
        operationType: 'signIn',
      });

      const request: SignInRequest = { email: 'test@example.com', password: 'password' };
      const result = await signIn(request);

      expect(result).toEqual(mockResponse);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, request.email, request.password);
    });

    it('should handle errors properly', async () => {
      vi.mocked(signInWithEmailAndPassword).mockRejectedValue(new FirebaseError('auth/invalid-email', 'Invalid email'));

      const request: SignInRequest = { email: 'test@example.com', password: 'password' };
      const result = await signIn(request);

      expect(result.error).toBeInstanceOf(FirebaseError);
      expect(result.error?.message).toBe('Invalid email');
    });
  });

  describe('signUp', () => {
    it('should sign up a new user and return response', async () => {
      const mockUser = { getIdToken: vi.fn().mockResolvedValue('mockToken') } as unknown as User;
      const mockUserApp = { uid: '123', userName: 'Test User', email: 'test@test.com' };
      const mockResponse = { error: null, data: { user: mockUserApp } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);
      vi.mocked(createUserWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
        providerId: '',
        operationType: 'signIn',
      });
      vi.mocked(updateProfile).mockResolvedValue(undefined);

      const request: SignUpRequest = { userName: 'Test User', email: 'test@example.com', password: 'password' };
      const result = await signUp(request);

      expect(result).toEqual(mockResponse);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, request.email, request.password);
      expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: request.userName });
    });

    it('should handle errors properly', async () => {
      vi.mocked(createUserWithEmailAndPassword).mockRejectedValue(
        new FirebaseError('auth/email-already-in-use', 'Email already in use')
      );

      const request: SignUpRequest = { userName: 'Test User', email: 'test@example.com', password: 'password' };
      const result = await signUp(request);

      expect(result.error).toBeInstanceOf(FirebaseError);
      expect(result.error?.message).toBe('Email already in use');
    });
  });

  describe('signOutServer', () => {
    it('should call signOutServer API and handle response', async () => {
      const mockResponse = { error: null, data: { isSignedOut: true } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await signOutServer();

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(API_ROUTE.SIGN_OUT, {
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should handle errors properly', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'));

      const result = await signOutServer();

      expect(result.error).toBeInstanceOf(AppError);
      expect(result.error?.message).toBe('Failed to sign out.');
    });
  });

  describe('signOut', () => {
    it('should sign out the user and call signOutServer', async () => {
      vi.mocked(signOutFirebase).mockResolvedValue(undefined);
      const mockResponse = { error: null, data: { isSignedOut: true } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await signOut();

      expect(result.data).toEqual({ isSignedOut: true });
      expect(signOutFirebase).toHaveBeenCalled();
    });

    it('should handle errors properly', async () => {
      vi.mocked(signOutFirebase).mockRejectedValue(new FirebaseError('auth/no-current-user', 'No current user'));

      const result = await signOut();

      expect(result.error).toBeInstanceOf(FirebaseError);
      expect(result.error?.message).toBe('No current user');
    });
  });

  describe('getAuthStatus', () => {
    it('should get authentication status and handle response', async () => {
      const mockResponse = { error: null, data: { isLoggedIn: true } };
      vi.mocked(fetch).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await getAuthStatus();

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(API_ROUTE.AUTH_STATUS, {
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should handle errors properly', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network Error'));

      const result = await getAuthStatus();

      expect(result.error).toBeInstanceOf(AppError);
      expect(result.error?.message).toBe('Failed to check authentication status.');
    });
  });
});
