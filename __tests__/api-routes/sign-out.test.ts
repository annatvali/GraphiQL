import { describe, it, expect, vi } from 'vitest';
import { getSessionCookie, deleteSessionCookie } from '@/lib/cookies';
import { revokeRefreshTokens } from '@/lib/firebase/server';
import { APP_ERROR_CODE, SESSION_COOKIE } from '@/constants';
import { GET } from '@/app/api/auth/sign-out/route';
import { AppError } from '@/types';

vi.mock('@/lib/cookies', () => ({
  getSessionCookie: vi.fn(),
  deleteSessionCookie: vi.fn(),
}));

vi.mock('@/lib/firebase/server', () => ({
  revokeRefreshTokens: vi.fn(),
}));

describe('GET /api/auth/sign-out', () => {
  it('should sign out successfully when session cookie exists', async () => {
    vi.mocked(getSessionCookie).mockReturnValueOnce('valid_session_cookie');
    vi.mocked(revokeRefreshTokens).mockResolvedValueOnce(undefined);

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: null,
        data: {
          isSignedOut: true,
        },
      })
    );

    expect(deleteSessionCookie).toHaveBeenCalled();
    expect(revokeRefreshTokens).toHaveBeenCalledWith('valid_session_cookie');

    const cookieHeader = response.headers.get('set-cookie');
    expect(cookieHeader).toContain(`${SESSION_COOKIE.NAME}=;`);
  });

  it('should return an error when session cookie is not found', async () => {
    vi.mocked(getSessionCookie).mockReturnValueOnce(undefined);

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        data: null,
        error: {
          code: APP_ERROR_CODE.SESSION_NOT_FOUND,
          name: 'AppError',
          message: 'Session not found.',
        },
      })
    );

    expect(deleteSessionCookie).not.toHaveBeenCalled();
    expect(revokeRefreshTokens).not.toHaveBeenCalled();
  });

  it('should return an error when token revocation fails', async () => {
    vi.mocked(getSessionCookie).mockReturnValueOnce('valid_session_cookie');
    vi.mocked(revokeRefreshTokens).mockRejectedValueOnce(
      new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Failed to revoke tokens')
    );

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        data: null,
        error: {
          code: APP_ERROR_CODE.UNKNOWN_ERROR,
          name: 'AppError',
          message: 'Failed to revoke tokens',
        },
      })
    );

    expect(deleteSessionCookie).toHaveBeenCalled();
    expect(revokeRefreshTokens).toHaveBeenCalledWith('valid_session_cookie');
  });

  it('should return an unknown error if an unexpected error occurs', async () => {
    vi.mocked(getSessionCookie).mockReturnValueOnce('valid_session_cookie');
    vi.mocked(revokeRefreshTokens).mockRejectedValueOnce(new Error('Unexpected error'));

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        data: null,
        error: {
          code: APP_ERROR_CODE.UNKNOWN_ERROR,
          name: 'AppError',
          message: 'An unexpected error occurred during logout.',
        },
      })
    );

    expect(deleteSessionCookie).toHaveBeenCalled();
    expect(revokeRefreshTokens).toHaveBeenCalledWith('valid_session_cookie');
  });
});
