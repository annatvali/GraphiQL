import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';

const NotFoundPage: React.FC = () => {
  const t = useTranslations('NOT_FOUND');

  return (
    <div className="flex flex-col items-center  justify-center min-h-[88vh] mt-40 mx-4">
      <Image src={'/not-found.png'} width={300} height={600} alt="cat" className="max-w-300 h-auto" />
      <h1 className="text-4xl md:text-6xl  text-center mt-[30px]">{t('title')}</h1>
      <p className="text-center mt-[30px]">{t('message')}</p>
      <Link className="text-blue-500 hover:underline" href="/">
        {t('link_to_main')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
