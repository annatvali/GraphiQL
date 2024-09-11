import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const signUpSchema = (t: ReturnType<typeof useTranslations<'VALIDATION'>>) =>
  z
    .object({
      userName: z
        .string()
        .min(3, { message: t('user-name-min-length') })
        .trim(),
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
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('passwords-must-match'),
    });
