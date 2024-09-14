import { describe, it, expect, vi } from 'vitest';
import { isUserAuthenticated } from '@/lib/firebase/server';
import { AppError } from '@/types';
import { APP_ERROR_CODE } from '@/constants';
import { GET } from '@/app/api/auth/status/route';

vi.mock('@/lib/firebase/server', () => ({
  isUserAuthenticated: vi.fn(),
}));

describe('GET /api/auth/status', () => {
  it('should return isLoggedIn true if the user is authenticated', async () => {
    vi.mocked(isUserAuthenticated).mockResolvedValueOnce(true);

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: null,
        data: {
          isLoggedIn: true,
        },
      })
    );
  });

  it('should return isLoggedIn false if the user is not authenticated', async () => {
    vi.mocked(isUserAuthenticated).mockResolvedValueOnce(false);

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: null,
        data: {
          isLoggedIn: false,
        },
      })
    );
  });

  it('should return an error if isUserAuthenticated throws an error', async () => {
    vi.mocked(isUserAuthenticated).mockRejectedValueOnce(
      new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Authentication failed')
    );

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: {
          code: APP_ERROR_CODE.UNKNOWN_ERROR,
          name: 'AppError',
          message: 'Authentication failed',
        },
        data: null,
      })
    );
  });

  it('should return an unknown error if an unexpected error is thrown', async () => {
    vi.mocked(isUserAuthenticated).mockRejectedValueOnce(new Error('Unexpected error'));

    const response = await GET();

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: {
          code: APP_ERROR_CODE.UNKNOWN_ERROR,
          name: 'AppError',
          message: 'Failed to check user status.',
        },
        data: null,
      })
    );
  });
});
