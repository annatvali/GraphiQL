import { describe, it, expect, vi } from 'vitest';
import { DecodedIdToken } from 'firebase-admin/auth';
import { firebaseAdminAuth } from '@/lib/firebase/server/config';
import { AppError } from '@/types';
import { rethrowError } from '@/utils';
import { APP_ERROR_CODE } from '@/constants';
import { createSessionCookie, revokeRefreshTokens } from '@/lib/firebase/server/session';

vi.mock('firebase-admin/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  cert: vi.fn(),
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn(),
    createSessionCookie: vi.fn(),
    revokeRefreshTokens: vi.fn(),
    verifySessionCookie: vi.fn(),
  })),
}));

vi.mock('@/lib/firebase/server/config', () => {
  return {
    firebaseAdminAuth: {
      verifyIdToken: vi.fn(),
      createSessionCookie: vi.fn(),
      revokeRefreshTokens: vi.fn(),
      verifySessionCookie: vi.fn(),
    },
  };
});

vi.mock('@/utils', () => ({
  rethrowError: vi.fn(),
}));

describe('createSessionCookie', () => {
  it('should create a session cookie successfully', async () => {
    const idToken = 'valid-id-token';
    const sessionCookieOptions = { expiresIn: 3600 };
    const sessionCookie = 'session-cookie';
    const mockUid = 'mockUid';
    const mockDecodedIdToken: DecodedIdToken = {
      aud: 'mockAudience',
      auth_time: Math.floor(Date.now() / 1000) - 10,
      exp: 1234567890,
      firebase: {
        identities: {},
        sign_in_provider: 'password',
      },
      iat: 1234567890,
      iss: 'mockIssuer',
      sub: 'user-id',
      uid: mockUid,
    };

    const verifyIdTokenMock = vi.mocked(firebaseAdminAuth).verifyIdToken.mockResolvedValue(mockDecodedIdToken);
    const createSessionCookieMock = vi.mocked(firebaseAdminAuth).createSessionCookie.mockResolvedValue(sessionCookie);

    const result = await createSessionCookie(idToken, sessionCookieOptions);

    expect(result).toBe(sessionCookie);
    expect(verifyIdTokenMock).toHaveBeenCalledWith(idToken);
    expect(createSessionCookieMock).toHaveBeenCalledWith(idToken, sessionCookieOptions);
  });

  it('should throw an error if recent sign-in is required', async () => {
    const idToken = 'valid-id-token';
    const sessionCookieOptions = { expiresIn: 3600 };
    const mockUid = 'mockUid';
    const mockDecodedIdToken: DecodedIdToken = {
      aud: 'mockAudience',
      auth_time: Math.floor(Date.now() / 1000) - 600,
      exp: 1234567890,
      firebase: {
        identities: {},
        sign_in_provider: 'password',
      },
      iat: 1234567890,
      iss: 'mockIssuer',
      sub: 'user-id',
      uid: mockUid,
    };

    vi.mocked(firebaseAdminAuth).verifyIdToken.mockResolvedValue(mockDecodedIdToken);
    const revokeRefreshTokensMock = vi.mocked(firebaseAdminAuth).revokeRefreshTokens.mockResolvedValue(undefined);

    const result = await createSessionCookie(idToken, sessionCookieOptions);

    const expectedError = new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Recent sign-in required');
    expect(result).toBe(null);
    expect(revokeRefreshTokensMock).toHaveBeenCalledWith(mockDecodedIdToken.sub);
    expect(rethrowError).toHaveBeenCalledWith(expectedError, {
      fallbackMessage: 'Failed to create session cookie.',
    });
  });

  it('should handle errors properly', async () => {
    const idToken = 'valid-id-token';
    const sessionCookieOptions = { expiresIn: 3600 };
    const expectedError = new Error('Verification failed');

    vi.mocked(firebaseAdminAuth).verifyIdToken.mockRejectedValue(expectedError);

    const result = await createSessionCookie(idToken, sessionCookieOptions);

    expect(result).toBe(null);
    expect(rethrowError).toHaveBeenCalledWith(expectedError, {
      fallbackMessage: 'Failed to create session cookie.',
    });
  });
});

describe('revokeRefreshTokens', () => {
  it('should revoke refresh tokens successfully', async () => {
    const sessionCookie = 'valid-session-cookie';
    const mockUid = 'mockUid';
    const mockDecodedIdToken: DecodedIdToken = {
      aud: 'mockAudience',
      auth_time: 1234567890,
      exp: 1234567890,
      firebase: {
        identities: {},
        sign_in_provider: 'password',
      },
      iat: 1234567890,
      iss: 'mockIssuer',
      sub: 'user-id',
      uid: mockUid,
    };

    const verifySessionCookieMock = vi
      .mocked(firebaseAdminAuth)
      .verifySessionCookie.mockResolvedValue(mockDecodedIdToken);
    const revokeRefreshTokensMock = vi.mocked(firebaseAdminAuth).revokeRefreshTokens.mockResolvedValue(undefined);

    await revokeRefreshTokens(sessionCookie);

    expect(verifySessionCookieMock).toHaveBeenCalledWith(sessionCookie);
    expect(revokeRefreshTokensMock).toHaveBeenCalledWith(mockDecodedIdToken.sub);
  });

  it('should handle errors properly', async () => {
    const sessionCookie = 'valid-session-cookie';
    const expectedError = new Error('Verification failed');

    vi.mocked(firebaseAdminAuth).verifySessionCookie.mockRejectedValue(expectedError);

    await revokeRefreshTokens(sessionCookie);

    expect(rethrowError).toHaveBeenCalledWith(expectedError, {
      fallbackMessage: 'Failed to revoke refresh tokens.',
    });
  });
});
