import { FirebaseError } from 'firebase/app';
import { TranslationValues } from 'next-intl';

export const getFirebaseErrorMessage = (
  error: FirebaseError,
  t: (key: string, values?: TranslationValues) => string
): string => {
  const errorCode = error.code;
  const translatedMessage = t(errorCode);

  if (translatedMessage === errorCode) {
    return t('app/unknown-error', { errorCode: ` (${errorCode})` });
  }

  return translatedMessage;
};
