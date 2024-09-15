import React from 'react';
import { useTranslations } from 'next-intl';
import ButtonLink from './ButtonLink';
import { PATH } from '@/constants';

const UnauthenticatedPage: React.FC = () => {
  const t = useTranslations('MAIN_UNAUTH');

  return (
    <section className="flex flex-col min-h-600 mt-10 bg-[url('../public/cloud.png')] bg-no-repeat bg-custom-size bg-right sm-max:bg-[url('../public/lins.png')]">
      <h1 className="color-white text-6xl font-medium">{t('greeting')}</h1>
      <p className="my-2 text-lg">{t('descr')}</p>
      <div className="flex gap-4 my-8">
        <ButtonLink href={PATH.LOGIN}>{t('signin_link')}</ButtonLink>
        <ButtonLink href={PATH.REGISTER}>{t('signup_link')}</ButtonLink>
      </div>
    </section>
  );
};

export default UnauthenticatedPage;
