import { describe, it, expect, vi } from 'vitest';
import { SESSION_COOKIE } from '@/constants';
import { cookies } from 'next/headers';
import { getSessionCookie, setSessionCookie, deleteSessionCookie } from '@/lib/cookies';

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  })),
}));

describe('Cookie Functions', () => {
  it.todo('getSessionCookie returns undefined when no cookie exists', () => {
    const mockCookies = cookies();
    const getSpy = vi.spyOn(mockCookies, 'get');

    const result = getSessionCookie();

    expect(result).toBeUndefined();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(mockCookies).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });

  it('should spy on the get method', () => {
    const mockCookies = cookies();
    const getSpy = vi.spyOn(mockCookies, 'get');

    mockCookies.get('testKey');

    expect(getSpy).toHaveBeenCalledWith('testKey');
  });

  it.todo('getSessionCookie returns cookie value when it exists', () => {
    const mockCookieValue = 'some-value';
    const mockCookies = cookies();

    const getSpy = vi.spyOn(mockCookies, 'get');
    getSpy.mockReturnValue({ name: SESSION_COOKIE.NAME, value: mockCookieValue });

    const result = getSessionCookie();

    expect(result).toBe(mockCookieValue);

    expect(mockCookies).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });

  it.todo('setSessionCookie adds a new cookie', () => {
    const mockCookies = vi.mocked(cookies);

    setSessionCookie('test-value', 3600);

    expect(mockCookies).toHaveBeenCalledWith(SESSION_COOKIE.NAME, 'test-value', {
      maxAge: 3600,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
  });

  it.todo('deleteSessionCookie removes the cookie', () => {
    const mockCookies = vi.mocked(cookies);

    deleteSessionCookie();

    expect(mockCookies).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });
});
