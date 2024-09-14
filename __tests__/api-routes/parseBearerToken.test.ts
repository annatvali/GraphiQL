import { expect, test } from 'vitest';
import { parseBearerToken } from '@/app/api/auth/sign-in/parseBearerToken';

test('parseBearerToken parses a valid Bearer token', () => {
  const result = parseBearerToken('Bearer abc123');

  expect(result).toBe('abc123');
});

test('parseBearerToken throws an error for invalid inputs', () => {
  expect(() => parseBearerToken(null)).toThrowError('Authorization header is missing');
  expect(() => parseBearerToken('Invalid')).toThrowError('Authorization header format is invalid or token is missing');
});
