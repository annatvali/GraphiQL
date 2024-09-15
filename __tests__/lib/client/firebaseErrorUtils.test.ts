import { describe, expect, it, vi } from 'vitest';
import { FirebaseError } from 'firebase/app';
import { createTranslator, useTranslations } from 'next-intl';
import { AppError } from '@/types';
import { APP_ERROR_CODE } from '@/constants';
import { getErrorMessage } from '@/lib/firebase/client';

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('next-intl', async () => {
  const original = await vi.importActual('next-intl');

  return {
    ...original,
    useTranslations: () => vi.fn(),
  };
});

const messages = {
  [APP_ERROR_CODE.UNEXPECTED_APP_ERROR]: 'Unexpected application error{errorMessage}',
  [APP_ERROR_CODE.UNEXPECTED_FIREBASE_ERROR]: 'Unexpected Firebase error{errorMessage}',
  'auth/invalid-email': 'Invalid email address',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Incorrect password',
} as unknown as IntlMessages;

const t = createTranslator({ locale: 'en', messages }) as unknown as ReturnType<typeof useTranslations<'ERRORS'>>;

describe('getErrorMessage', () => {
  it('should return formatted message for UNEXPECTED_APP_ERROR', () => {
    const error = new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Custom error message');
    const translated = getErrorMessage(error, t);

    expect(translated).toBe('Unexpected application error (Custom error message)');
  });

  it('should return the correct translation for known Firebase error codes', () => {
    const error = new FirebaseError('auth/invalid-email', 'Invalid email address');
    const translated = getErrorMessage(error, t);

    expect(translated).toBe('Invalid email address');
  });

  it('should return fallback message for unknown Firebase error codes', () => {
    const error = new FirebaseError('auth/unknown-error', 'Unknown error');
    const translated = getErrorMessage(error, t);

    expect(translated).toBe('Unexpected Firebase error (auth/unknown-error)');
  });

  it('should return fallback message for unknown AppError codes', () => {
    const error = new AppError('UNKNOWN_ERROR_CODE', 'Some error');
    const translated = getErrorMessage(error, t);

    expect(translated).toBe('Unexpected Firebase error (UNKNOWN_ERROR_CODE)');
  });
});
