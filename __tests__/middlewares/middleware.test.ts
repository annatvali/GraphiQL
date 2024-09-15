// middleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/middlewares';
import middleware, { config } from '@/middleware';

vi.mock('@/middlewares', () => ({
  authMiddleware: vi.fn(),
}));

vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => () => new NextResponse('intlMiddleware response')),
}));

describe('middleware', () => {
  it('should call authMiddleware and return its response if available', async () => {
    const mockAuthResponse = new NextResponse('authMiddleware response');
    vi.mocked(authMiddleware).mockResolvedValue(mockAuthResponse);

    const request = {} as NextRequest;
    const response = await middleware(request);

    expect(response).toBe(mockAuthResponse);
    expect(authMiddleware).toHaveBeenCalledWith(request);
  });

  it('should call intlMiddleware if authMiddleware does not return a response', async () => {
    vi.mocked(authMiddleware).mockResolvedValue(undefined);

    const request = {} as NextRequest;
    const response = await middleware(request);

    expect(await response.text()).toBe('intlMiddleware response');
    expect(authMiddleware).toHaveBeenCalledWith(request);
  });

  it('should match the specified paths in the config', () => {
    expect(config.matcher).toEqual(['/((?!api|_next|_vercel|.*\\..*).*)']);
  });
});
