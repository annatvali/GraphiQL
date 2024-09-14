'use client';

import { createContext, useEffect, useState, ReactNode, useCallback, Dispatch, SetStateAction } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { firebaseClientAuth } from '@/lib/firebase/client/config';
import { AuthUser } from '@/types';
import { getAuthStatus, signOutServer } from '@/lib/firebase/client';

interface AuthContextType {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
  user?: AuthUser | null;
}

const authCheckIntervalSeconds = 60;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children, user: initialUser = null }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const checkUserStatus = useCallback(async () => {
    try {
      const { error } = await getAuthStatus();

      if (error) {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const handleUserChange = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      try {
        setUser(null);
        await signOutServer();
      } catch {
        return;
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(firebaseClientAuth, (user) => void handleUserChange(user));

    return () => {
      unsubscribe();
    };
  }, [handleUserChange]);

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => void checkUserStatus(), authCheckIntervalSeconds * 1000);

      return () => clearInterval(intervalId);
    }
  }, [user, checkUserStatus]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
