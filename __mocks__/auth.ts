import { vi } from 'vitest';

export * from '@/lib/firebase/client/auth';

export const signIn = vi.fn();
export const signUp = vi.fn();
export const signOut = vi.fn();
