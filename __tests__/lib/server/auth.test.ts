import { describe, it, expect, vi } from 'vitest';
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { getSessionCookie } from '@/lib/cookies';
import { rethrowError } from '@/utils';
import { firebaseAdminAuth } from '@/lib/firebase/server/config';
import { getCurrentUser, isUserAuthenticated, getUserByUid } from '@/lib/firebase/server/auth';

vi.mock('@/lib/cookies', () => ({
  getSessionCookie: vi.fn(),
}));

vi.mock('@/utils', () => ({
  rethrowError: vi.fn(),
}));

vi.mock('@/lib/firebase/server/config', () => ({
  firebaseAdminAuth: {
    verifySessionCookie: vi.fn(),
    getUser: vi.fn(),
  },
}));

describe('Auth Functions', () => {
  describe('getCurrentUser', () => {
    it('should return mapped user data when user exists', async () => {
      const mockUid = 'mockUid';
      const mockUserRecord: UserRecord = {
        uid: mockUid,
        email: 'test@example.com',
        displayName: 'Test User',
      } as UserRecord;

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
        sub: 'mockSub',
        uid: mockUid,
      };

      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockResolvedValue(mockDecodedIdToken);
      vi.mocked(firebaseAdminAuth).getUser.mockResolvedValue(mockUserRecord);

      const result = await getCurrentUser();

      expect(result).toEqual({
        uid: mockUid,
        email: 'test@example.com',
        userName: 'Test User',
      });
    });

    it('should return null when no session cookie is present', async () => {
      vi.mocked(getSessionCookie).mockReturnValue(undefined);

      const result = await getCurrentUser();

      expect(result).toBeNull();
    });

    it('should return null when failed to verify session cookie', async () => {
      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockRejectedValue(new Error('Verification Error'));

      const result = await getCurrentUser();

      expect(result).toBeNull();
      expect(rethrowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Verification Error',
        }),
        expect.objectContaining({
          fallbackMessage: 'Failed to verify session cookie.',
        })
      );
    });

    it('should return null when failed to get user data', async () => {
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
        sub: 'mockSub',
        uid: mockUid,
      };

      const expectedError = new Error('Get User Error');

      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockResolvedValue(mockDecodedIdToken);
      vi.mocked(firebaseAdminAuth).getUser.mockRejectedValue(expectedError);

      const result = await getCurrentUser();

      expect(result).toBeNull();
      expect(rethrowError).toHaveBeenCalledWith(
        expect.objectContaining(expectedError),
        expect.objectContaining({
          fallbackMessage: 'Failed to get user data.',
        })
      );
    });
  });

  describe('isUserAuthenticated', () => {
    it('should return true if user UID is verified', async () => {
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
        sub: 'mockSub',
        uid: mockUid,
      };

      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockResolvedValue(mockDecodedIdToken);

      const result = await isUserAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false if token verification fails', async () => {
      const verificationError = new Error('Verification Error');

      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockRejectedValue(verificationError);

      const result = await isUserAuthenticated();

      expect(result).toBe(false);
      expect(rethrowError).toHaveBeenCalledWith(
        expect.objectContaining(verificationError),
        expect.objectContaining({
          fallbackMessage: 'Failed to verify session cookie.',
        })
      );
    });

    it('should return false when failed to verify session cookie', async () => {
      vi.mocked(getSessionCookie).mockReturnValue('mockSessionCookie');
      vi.mocked(firebaseAdminAuth).verifySessionCookie.mockRejectedValue(new Error('Verification Error'));

      const result = await isUserAuthenticated();

      expect(result).toBe(false);
      expect(rethrowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Verification Error',
        }),
        expect.objectContaining({
          fallbackMessage: 'Failed to verify session cookie.',
        })
      );
    });
  });

  describe('getUserByUid', () => {
    it('should return mapped user data when user exists', async () => {
      const mockUserRecord: UserRecord = {
        uid: 'mockUid',
        email: 'test@example.com',
        displayName: 'Test User',
      } as UserRecord;

      vi.mocked(firebaseAdminAuth).getUser.mockResolvedValue(mockUserRecord);

      const result = await getUserByUid('mockUid');

      expect(result).toEqual({
        uid: 'mockUid',
        email: 'test@example.com',
        userName: 'Test User',
      });
    });

    it('should return null when no UID is provided', async () => {
      const result = await getUserByUid('');

      expect(result).toBeNull();
    });

    it('should return null when failed to get user by UID', async () => {
      vi.mocked(firebaseAdminAuth).getUser.mockRejectedValue(new Error('Get User Error'));

      const result = await getUserByUid('mockUid');

      expect(result).toBeNull();
      expect(rethrowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Get User Error',
        }),
        expect.objectContaining({
          fallbackMessage: 'Failed to get user by uid.',
        })
      );
    });
  });
});
