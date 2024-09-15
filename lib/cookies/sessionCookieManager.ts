import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/constants';

export const getSessionCookie = (): string | undefined => {
  const cookieStore = cookies();

  return cookieStore.get(SESSION_COOKIE.NAME)?.value;
};

export const setSessionCookie = (sessionCookie: string, expiresInSeconds: number) => {
  const cookieStore = cookies();

  cookieStore.set(SESSION_COOKIE.NAME, sessionCookie, {
    maxAge: expiresInSeconds,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
};

export const deleteSessionCookie = (): void => {
  const cookieStore = cookies();

  cookieStore.delete(SESSION_COOKIE.NAME);
};
