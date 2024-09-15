import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'next-intl';

export const renderWithTranslations = (ui: ReactNode, { locale = 'en', messages = {} } = {}) => {
  return render(
    <IntlProvider messages={messages} locale={locale}>
      {ui}
    </IntlProvider>
  );
};
