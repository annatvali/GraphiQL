import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { setSessionCookie } from '@/lib/cookies';
import { createSessionCookie, getCurrentUser } from '@/lib/firebase/server';
import { APP_ERROR_CODE, SESSION_COOKIE } from '@/constants';
import { parseBearerToken } from '@/lib/firebase/server/parseBearerToken';
import { POST } from '@/app/api/auth/sign-in/route';

vi.mock('@/lib/cookies', () => ({
  setSessionCookie: vi.fn(),
}));

vi.mock('@/lib/firebase/server', () => ({
  createSessionCookie: vi.fn(),
  getCurrentUser: vi.fn(),
}));

vi.mock('@/lib/firebase/server/parseBearerToken', () => ({
  parseBearerToken: vi.fn(),
}));

const ROUTE_URL = 'http://localhost/api/auth/sign-in';
const url = new URL(ROUTE_URL);

describe('POST /api/auth/sign-in', () => {
  const mockIdToken = 'mock-id-token';
  const mockSessionCookie = 'mock-session-cookie';
  const mockUser = {
    uid: '123',
    userName: 'Test User',
    email: 'test@test.com',
  };

  it('should sign in successfully when the token and session are valid', async () => {
    vi.mocked(parseBearerToken).mockReturnValueOnce(mockIdToken);
    vi.mocked(createSessionCookie).mockResolvedValueOnce(mockSessionCookie);
    vi.mocked(getCurrentUser).mockResolvedValueOnce(mockUser);

    const req = new NextRequest(url, {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${mockIdToken}`, 'Content-Type': 'application/json' }),
    });

    const response = await POST(req);

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: null,
        data: {
          user: mockUser,
        },
      })
    );

    expect(setSessionCookie).toHaveBeenCalledWith(mockSessionCookie, SESSION_COOKIE.MAX_AGE_SECONDS);

    const setCookieHeader = response.headers.get('Set-Cookie');
    expect(setCookieHeader).toContain(`user_session=${mockSessionCookie}`);
  });

  it('should return an error if the authorization header is missing', async () => {
    vi.mocked(parseBearerToken).mockImplementationOnce(() => {
      throw new Error('Authorization header is missing');
    });

    const req = new NextRequest(url, {
      method: 'POST',
    });

    const response = await POST(req);

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: { code: APP_ERROR_CODE.UNKNOWN_ERROR, name: 'AppError', message: 'Failed to sign in.' },
        data: null,
      })
    );

    expect(setSessionCookie).not.toHaveBeenCalled();
    expect(getCurrentUser).not.toHaveBeenCalled();
  });

  it('should return an error if session cookie creation fails', async () => {
    vi.mocked(parseBearerToken).mockReturnValueOnce(mockIdToken);
    vi.mocked(createSessionCookie).mockResolvedValueOnce(null);

    const req = new NextRequest(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mockIdToken}`,
      },
    });

    const response = await POST(req);

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: {
          code: APP_ERROR_CODE.UNEXPECTED_APP_ERROR,
          name: 'AppError',
          message: 'Failed to create session cookie.',
        },
        data: null,
      })
    );

    expect(setSessionCookie).not.toHaveBeenCalled();
    expect(getCurrentUser).not.toHaveBeenCalled();
  });

  it('should return an error if retrieving the user fails', async () => {
    vi.mocked(parseBearerToken).mockReturnValueOnce(mockIdToken);
    vi.mocked(createSessionCookie).mockResolvedValueOnce(mockSessionCookie);
    vi.mocked(getCurrentUser).mockResolvedValueOnce(null);

    const req = new NextRequest(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mockIdToken}`,
      },
    });

    const response = await POST(req);

    expect(response.status).toBe(200);

    const resText = await response.text();

    expect(resText).toEqual(
      JSON.stringify({
        error: {
          code: APP_ERROR_CODE.USER_NOT_FOUND,
          name: 'AppError',
          message: 'Failed to retrieve user information after signing in.',
        },
        data: null,
      })
    );

    expect(setSessionCookie).toHaveBeenCalledWith(mockSessionCookie, SESSION_COOKIE.MAX_AGE_SECONDS);
  });
});
