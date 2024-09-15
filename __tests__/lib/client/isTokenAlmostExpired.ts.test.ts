import { describe, it, expect, vi } from 'vitest';
import { jwtDecode } from 'jwt-decode';
import { isTokenAlmostExpired } from '@/lib/firebase/client/isTokenAlmostExpired';

vi.mock('jwt-decode', () => {
  const jwtDecodeMock = vi.fn();

  return {
    jwtDecode: jwtDecodeMock,
  };
});

describe('isTokenAlmostExpired', () => {
  const mockJwtDecode = vi.mocked(jwtDecode);

  it('should return true if the token is almost expired', () => {
    mockJwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 10 });
    expect(isTokenAlmostExpired('mockedToken', 15)).toBe(true);
  });

  it('should return false if the token is not close to expiration', () => {
    mockJwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 600 });
    expect(isTokenAlmostExpired('mockedToken', 15)).toBe(false);
  });

  it('should return true if the token is exactly at the buffer period', () => {
    mockJwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 120 });
    expect(isTokenAlmostExpired('mockedToken', 120)).toBe(true);
  });

  it('should throw an error for an invalid token', () => {
    mockJwtDecode.mockImplementation(() => {
      throw new Error('Invalid token.');
    });
    expect(() => isTokenAlmostExpired('invalidToken', 15)).toThrow('Invalid token.');
  });

  it('should return true for expired token', () => {
    mockJwtDecode.mockReturnValue({ exp: Math.floor(Date.now() / 1000) - 10 });
    expect(isTokenAlmostExpired('mockedToken', 15)).toBe(true);
  });
});
