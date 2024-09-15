// authMiddleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { HTTP_STATUS_CODE, PATH } from '@/constants';
import { isAuthStatusResponse } from '@/utils/guards';

vi.mock('next/server', () => {
  const redirectMock = vi.fn().mockImplementation((url: string) => ({ url }));

  return {
    NextResponse: {
      redirect: redirectMock,
    },
  };
});

vi.mock('@/utils/guards', () => ({
  isAuthStatusResponse: vi.fn(),
}));

vi.stubGlobal(
  'URL',
  class {
    constructor(
      public href: string,
      public base?: string
    ) {}

    toString() {
      return this.href;
    }
  }
);

global.fetch = vi.fn();

describe('authMiddleware', () => {
  const mockRequest = (pathname: string, cookieValue: string | null) => ({
    nextUrl: {
      clone: () => ({ pathname, searchParams: new URLSearchParams() }),
    },
    cookies: {
      get: () => ({ value: cookieValue }),
    },
  });

  it('should redirect to main page if no session cookie and path is protected', async () => {
    const request = mockRequest('/some-protected-path', null);
    vi.mocked(fetch).mockResolvedValueOnce({
      status: HTTP_STATUS_CODE.OK,
      json: () => Promise.resolve({}),
    } as Response);
    await authMiddleware(request as NextRequest);

    expect(vi.mocked(NextResponse).redirect).toHaveBeenCalledWith({
      pathname: PATH.MAIN,
      searchParams: new URLSearchParams(),
    });
  });

  it('should redirect to main page if auth status response is invalid', async () => {
    const request = mockRequest('/some-protected-path', 'valid-session');
    vi.mocked(fetch).mockResolvedValueOnce({
      status: HTTP_STATUS_CODE.OK,
      json: () => Promise.resolve({}),
    } as Response);

    vi.mocked(isAuthStatusResponse).mockReturnValue(false);

    await authMiddleware(request as NextRequest);

    expect(vi.mocked(NextResponse).redirect).toHaveBeenCalledWith({
      pathname: PATH.MAIN,
      searchParams: new URLSearchParams(),
    });
  });

  it('should not redirect if authenticated user on protected path', async () => {
    const request = mockRequest('/some-protected-path', 'valid-session');
    vi.mocked(fetch).mockResolvedValueOnce({
      status: HTTP_STATUS_CODE.OK,
      json: () =>
        Promise.resolve({
          data: { isLoggedIn: true },
          error: null,
        }),
    } as Response);
    vi.mocked(isAuthStatusResponse).mockReturnValue(true);

    const response = await authMiddleware(request as NextRequest);

    expect(response).toBeUndefined();
  });

  it('should not redirect if unauthenticated user on unauthenticated path', async () => {
    const request = mockRequest(PATH.LOGIN, 'valid-session');
    vi.mocked(fetch).mockResolvedValueOnce({
      status: HTTP_STATUS_CODE.OK,
      json: () =>
        Promise.resolve({
          data: { isLoggedIn: false },
          error: null,
        }),
    } as Response);
    vi.mocked(isAuthStatusResponse).mockReturnValue(true);

    const response = await authMiddleware(request as NextRequest);

    expect(response).toBeUndefined();
  });
});
