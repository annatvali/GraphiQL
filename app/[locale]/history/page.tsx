'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { withAuthRedirect } from '@/app/hoc';

const HistoryPage: React.FC = () => {
  const t = useTranslations('HISTORY');

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto pt-16">
      <h1 className="color-white text-6xl font-medium">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

const HistoryPageWithAuth = withAuthRedirect(HistoryPage, { redirectIfLoggedIn: false });

export default HistoryPageWithAuth;
