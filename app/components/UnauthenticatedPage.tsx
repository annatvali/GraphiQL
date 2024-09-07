import React from 'react';
import { useTranslations } from 'next-intl';
import Button from './Button';

const UnauthenticatedPage: React.FC = () => {
  const t = useTranslations('MAIN_UNAUTH');

  return (
    <section className="flex flex-col min-h-600 mt-10 bg-[url('../public/cloud.png')] bg-no-repeat bg-custom-size bg-right sm-max:bg-[url('../public/lins.png')]">
      <h1 className="color-white text-6xl font-medium">{t('greeting')}</h1>
      <p className="my-2 text-lg">{t('descr')}</p>
      <div className="flex gap-4 my-8">
        <Button href={'/login'}>{t('signin_link')}</Button>
        <Button href={'/register'}>{t('signup_link')}</Button>
      </div>
    </section>
  );
};

export default UnauthenticatedPage;
