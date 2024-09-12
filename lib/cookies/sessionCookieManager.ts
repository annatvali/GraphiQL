import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/constants';

export const getSessionCookie = (): string | undefined => {
  const cookieStore = cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
};

export const setSessionCookie = (sessionCookie: string, expiresInMs: number) => {
  const cookieStore = cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: expiresInMs,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
};

export const deleteSessionCookie = (): void => {
  const cookieStore = cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
};
