import { describe, it, expect, vi } from 'vitest';
import { SESSION_COOKIE } from '@/constants';
import { cookies } from 'next/headers';
import { getSessionCookie, setSessionCookie, deleteSessionCookie } from '@/lib/cookies';

vi.mock('next/headers', () => {
  const getMock = vi.fn();
  const setMock = vi.fn();
  const deleteMock = vi.fn();

  const cookiesMock = vi.fn(() => ({
    get: getMock,
    set: setMock,
    delete: deleteMock,
  }));

  return {
    cookies: cookiesMock,
  };
});

describe('Cookie Functions', () => {
  it('getSessionCookie returns undefined when no cookie exists', () => {
    const getMock = cookies().get;

    const result = getSessionCookie();

    expect(result).toBeUndefined();

    expect(getMock).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });

  it('getSessionCookie returns cookie value when it exists', () => {
    const mockCookieValue = 'some-value';

    const getMock = cookies().get;
    vi.mocked(getMock).mockReturnValue({ name: SESSION_COOKIE.NAME, value: mockCookieValue });

    const result = getSessionCookie();

    expect(result).toBe(mockCookieValue);

    expect(getMock).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });

  it('setSessionCookie adds a new cookie', () => {
    const setMock = cookies().set;

    setSessionCookie('test-value', 3600);

    expect(setMock).toHaveBeenCalledWith(SESSION_COOKIE.NAME, 'test-value', {
      maxAge: 3600,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });
  });

  it('deleteSessionCookie removes the cookie', () => {
    const deleteMock = cookies().delete;

    deleteSessionCookie();

    expect(deleteMock).toHaveBeenCalledWith(SESSION_COOKIE.NAME);
  });
});
