'use client';

import { ReactNode } from 'react';
import { HTTP_METHODS, RESTFUL_METHODS_REGEX } from '@/constants';
import { RestfulClientPageWithAuth } from './RestfulClientPage';
import NotFoundPage from '@/app/[locale]/not-found';

type HttpMethodKey = (typeof HTTP_METHODS)[number];

const OtherPages = ({ params }: { params: { method: HttpMethodKey } }): ReactNode => {
  if (!RESTFUL_METHODS_REGEX.test(params.method)) {
    return <NotFoundPage />;
  }

  return <RestfulClientPageWithAuth params={params} />;
};

export default OtherPages;
