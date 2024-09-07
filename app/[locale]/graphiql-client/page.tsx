import React from 'react';
import { useTranslations } from 'next-intl';

const GraphiQLClientPage: React.FC = () => {
  const t = useTranslations('GRAPHI_CLIENT');

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto mt-40">
      <h1 className="color-white text-6xl font-medium">{t('title')}</h1>
      <p>Content for GraphiQL Client goes here.</p>
    </div>
  );
};

export default GraphiQLClientPage;
