'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { firebaseClientAuth } from '@/lib/firebase/client/config';
import { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
}

interface AuthContextProviderProps {
  children: ReactNode;
  user?: AuthUser | null;
}

const mapUserToAuthUser = ({ uid, email, displayName }: User): AuthUser => ({ uid, email, displayName });

export const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthContextProvider = ({ children, user: initialUser = null }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  useEffect(() => {
    const handleUserChange = (currentUser: User | null) => {
      setUser(currentUser ? mapUserToAuthUser(currentUser) : null);
    };

    const unsubscribe = onIdTokenChanged(firebaseClientAuth, handleUserChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
