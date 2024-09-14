import { describe, expect, it } from 'vitest';
import { AppError } from '@/types';
import { FirebaseError } from 'firebase/app';
import { APP_ERROR_CODE } from '@/constants';
import { rethrowError } from '@/utils';

describe('rethrowError', () => {
  it('should rethrow a FirebaseError as-is', () => {
    const error = new FirebaseError('auth/invalid-email', 'Invalid email');

    expect(() => rethrowError(error)).toThrow(FirebaseError);
    expect(() => rethrowError(error)).toThrow('Invalid email');
  });

  it('should rethrow an AppError as-is', () => {
    const error = new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, 'Unknown error');

    expect(() => rethrowError(error)).toThrow(AppError);
    expect(() => rethrowError(error)).toThrow('Unknown error');
  });

  it('should rethrow an AppError with a fallback message for generic Error objects', () => {
    const error = new Error('Something went wrong');
    const fallbackMessage = 'An error occurred';

    expect(() => rethrowError(error, { fallbackMessage })).toThrow(AppError);
    expect(() => rethrowError(error, { fallbackMessage })).toThrow(`${fallbackMessage}`);
  });

  it('should rethrow an AppError with a fallback message for non-Error objects', () => {
    const error = 'Some unknown error';
    const fallbackMessage = 'An unexpected error occurred';

    expect(() => rethrowError(error, { fallbackMessage })).toThrow(AppError);
    expect(() => rethrowError(error, { fallbackMessage })).toThrow(`${fallbackMessage}`);
  });

  it('should use an empty fallback message by default', () => {
    const error = new Error('Another error example');

    expect(() => rethrowError(error)).toThrow(AppError);
    expect(() => rethrowError(error)).toThrow('(Another error example).');
  });
});
