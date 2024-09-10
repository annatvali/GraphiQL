import React from 'react';
import { useTranslations } from 'next-intl';

const GraphQLClientPage: React.FC = () => {
  const t = useTranslations('GRAPHQL_CLIENT');

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto pt-16">
      <h1 className="color-white text-6xl font-medium">{t('title')}</h1>
      <p>Content for GraphQL Client goes here.</p>
    </div>
  );
};

export default GraphQLClientPage;
