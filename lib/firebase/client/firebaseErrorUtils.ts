import { FirebaseError } from 'firebase/app';
import { useTranslations } from 'next-intl';
import { AppError } from '@/types';
import { APP_ERROR_CODE } from '@/constants';

type ErrorKeys = keyof IntlMessages['ERRORS'];

export const getErrorMessage = (
  error: FirebaseError | AppError,
  t: ReturnType<typeof useTranslations<'ERRORS'>>
): string => {
  const { code: errorCode, message: errorMsg } = error;

  if (errorCode === APP_ERROR_CODE.UNEXPECTED_APP_ERROR) {
    const errorMessage = errorMsg ? ` (${errorMsg})` : '';

    return t(APP_ERROR_CODE.UNEXPECTED_APP_ERROR, { errorMessage });
  }

  const translatedMessage = t(errorCode as ErrorKeys);

  if (translatedMessage === errorCode) {
    const errorMessage = errorCode ? ` (${errorCode})` : '';

    return t(APP_ERROR_CODE.UNEXPECTED_FIREBASE_ERROR, { errorMessage });
  }

  return translatedMessage;
};
