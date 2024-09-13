import React, { useEffect } from 'react';
import { useRouter } from '@/navigation';
import { useAuth } from '@/app/hooks';
import { PATH } from '@/constants';
import Loading from '@/app/[locale]/loading';

export interface WithAuthRedirectProps {
  redirectIfLoggedIn: boolean;
}

export const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { redirectIfLoggedIn }: WithAuthRedirectProps
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (redirectIfLoggedIn ? user : !user) {
        router.replace(PATH.MAIN);
      }
    }, [user, router]);

    if (redirectIfLoggedIn ? user : !user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
