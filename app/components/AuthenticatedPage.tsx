import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { PATH } from '@/constants';

const AuthenticatedPage: React.FC = () => {
  const t = useTranslations('MAIN_AUTH');

  const username = 'User';
  const style =
    'bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light font-light text-xl p-2.5 rounded-[20px]';

  return (
    <section className="flex flex-col min-h-600 mt-10 bg-[url('../public/booble.png')] bg-no-repeat bg-bottom bg-contain sm-max:bg-[url('../public/booble-adapt.png')]">
      <h1 className="color-white text-6xl font-medium">{`${t('greeting')}${username}!`}</h1>
      <div className="flex gap-4 my-8">
        <Link className={style} href={PATH.RESTFULL_CLIENT}>
          {t('restfull_link')}
        </Link>
        <Link className={style} href={PATH.GRAPHIQL_CLIENT}>
          {t('graphiql_link')}
        </Link>
        <Link className={style} href={PATH.HISTORY}>
          {t('history_link')}
        </Link>
      </div>
    </section>
  );
};

export default AuthenticatedPage;
