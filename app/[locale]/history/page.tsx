import React from 'react';
import { useTranslations } from 'next-intl';

const HistoryPage: React.FC = () => {
  const t = useTranslations('HISTORY');

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto min-h-[80vh] mt-40">
      <h1 className="color-white text-6xl font-medium">{t('title')}</h1>
      <p>Content for History goes here.</p>
    </div>
  );
};

export default HistoryPage;
