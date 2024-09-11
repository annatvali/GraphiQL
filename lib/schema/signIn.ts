import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const signInSchema = (t: ReturnType<typeof useTranslations<'VALIDATION'>>) =>
  z.object({
    email: z
      .string()
      .email({ message: t('email-invalid') })
      .trim(),
    password: z
      .string()
      .min(8, { message: t('password-min-length') })
      .regex(/\p{L}/u, { message: t('password-must-contain-letter') })
      .regex(/\p{N}/u, { message: t('password-must-contain-digit') })
      .regex(/\P{L}\P{N}/u, { message: t('password-must-contain-special') })
      .trim(),
  });
