import { describe, it, expect } from 'vitest';
import { isAppError, isAuthUser, isSignInResponse, isSignOutResponse } from '@/utils/guards';

describe('Type Guards', () => {
  describe('isAppError', () => {
    it('should return true for valid AuthError objects', () => {
      const validError = { code: 'auth/invalid-email', message: 'Invalid email' };
      expect(isAppError(validError)).toBe(true);
    });

    it('should return false for invalid AuthError objects', () => {
      expect(isAppError({ code: 'auth/invalid-email' })).toBe(false);
      expect(isAppError({ message: 'Invalid email' })).toBe(false);
      expect(isAppError({ code: 123, message: 'Invalid email' })).toBe(false);
      expect(isAppError({ code: 'auth/invalid-email', message: 123 })).toBe(false);
      expect(isAppError(null)).toBe(false);
      expect(isAppError(undefined)).toBe(false);
    });
  });

  describe('isAuthUser', () => {
    it('should return true for valid AuthUser objects', () => {
      const validUser = { uid: '123', email: 'test@example.com', userName: 'testuser' };
      expect(isAuthUser(validUser)).toBe(true);
    });

    it('should return false for invalid AuthUser objects', () => {
      expect(isAuthUser({ uid: '123' })).toBe(false);
      expect(isAuthUser({ uid: '123', email: 'test@example.com' })).toBe(false);
      expect(isAuthUser({ uid: '123', email: null, userName: 'testuser' })).toBe(true);
      expect(isAuthUser({ uid: '123', email: 'test@example.com', userName: null })).toBe(true);
      expect(isAuthUser({ uid: 123, email: 'test@example.com', userName: 'testuser' })).toBe(false);
      expect(isAuthUser(null)).toBe(false);
      expect(isAuthUser(undefined)).toBe(false);
    });
  });

  describe('isSignInResponse', () => {
    it('should return true for valid SignInResponse objects', () => {
      const validResponse = {
        data: { user: { uid: '123', email: 'test@example.com', userName: 'testuser' } },
        error: null,
      };
      expect(isSignInResponse(validResponse)).toBe(true);
    });

    it('should return false for invalid SignInResponse objects', () => {
      expect(isSignInResponse({ data: { user: { uid: '123' } }, error: null })).toBe(false);
      expect(isSignInResponse({ data: null, error: { code: 'auth/invalid-email', message: 'Invalid email' } })).toBe(
        true
      );
      expect(
        isSignInResponse({
          data: { user: { uid: '123', email: 'test@example.com', userName: 'testuser' } },
          error: { code: 'auth/invalid-email', message: 'Invalid email' },
        })
      ).toBe(false);
      expect(isSignInResponse(null)).toBe(false);
      expect(isSignInResponse(undefined)).toBe(false);
    });
  });

  describe('isSignOutResponse', () => {
    it('should return true for valid SignOutResponse objects', () => {
      const validResponse = {
        data: { isSignedOut: true },
        error: null,
      };
      expect(isSignOutResponse(validResponse)).toBe(true);
    });

    it('should return false for invalid SignOutResponse objects', () => {
      expect(isSignOutResponse({ data: { isSignedOut: 'true' }, error: null })).toBe(false);
      expect(isSignOutResponse({ data: null, error: { code: 'auth/invalid-email', message: 'Invalid email' } })).toBe(
        true
      );
      expect(
        isSignOutResponse({
          data: { isSignedOut: true },
          error: { code: 'auth/invalid-email', message: 'Invalid email' },
        })
      ).toBe(false);
      expect(isSignOutResponse(null)).toBe(false);
      expect(isSignOutResponse(undefined)).toBe(false);
    });
  });
});
