import { APP_ERROR_CODE } from '@/constants';
import { AppError } from '@/types';
import { FirebaseError } from 'firebase/app';

interface RethrowErrorOptions {
  fallbackMessage?: string;
}

export const rethrowError = (error: unknown, { fallbackMessage = '' }: RethrowErrorOptions = {}): never => {
  if (error instanceof FirebaseError || error instanceof AppError) {
    throw error;
  }

  const errorMessage = error instanceof Error ? ` (${error.message}).` : '';

  throw new AppError(APP_ERROR_CODE.UNKNOWN_ERROR, `${fallbackMessage}${errorMessage}`);
};
