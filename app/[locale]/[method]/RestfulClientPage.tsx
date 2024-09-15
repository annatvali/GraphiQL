'use client';

import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { withAuthRedirect } from '@/app/hoc';
import { HTTP_METHODS } from '@/constants';

type HttpMethodKey = (typeof HTTP_METHODS)[number];

const RestfulClientPage = ({ params }: { params: { method: HttpMethodKey } }): ReactNode => {
  const t = useTranslations('RESTFUL_CLIENT');
  useState(params.method);

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto pt-16">
      <h1 className="color-white text-6xl font-medium">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export const RestfulClientPageWithAuth = withAuthRedirect(RestfulClientPage, { redirectIfLoggedIn: false });
