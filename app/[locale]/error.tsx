'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/app/components/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const t = useTranslations('ERROR_PAGE');

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center pt-10 mx-4">
          <h2 className="text-4xl md:text-6xl text-center mt-[30px]">{t('title')}</h2>
          <p>{error?.message ?? ''}</p>
          <Button onClick={() => reset()}>{t('button_refresh')}</Button>
        </div>
      </body>
    </html>
  );
};

export default ErrorPage;
