import { APP_ERROR_CODE } from '@/constants';
import { AppError } from '@/types';

export const parseBearerToken = (authorizationHeader: string | null): string => {
  if (!authorizationHeader) {
    throw new AppError(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, 'Authorization header is missing');
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new AppError(
      APP_ERROR_CODE.UNEXPECTED_APP_ERROR,
      'Authorization header format is invalid or token is missing'
    );
  }

  return token;
};
