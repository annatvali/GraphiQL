import { useContext } from 'react';
import { AuthContext } from '@/app/context';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  const { user, setUser } = context;

  return { user, setUser, signIn, signUp, signOut };
};
