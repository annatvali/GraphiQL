import { useContext } from 'react';
import { AuthContext } from '@/app/context';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';

export const useAuth = () => {
  const { user } = useContext(AuthContext);

  return { user, signIn, signUp, signOut };
};
