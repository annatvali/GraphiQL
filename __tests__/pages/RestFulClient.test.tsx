import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import RestfulClientPage from '@/app/[locale]/restful-client/page';

let mockMessages: IntlMessages;
const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockRestfulTranslations = {
    RESTFUL_CLIENT: {
      title: 'RESTful Client',
      description: 'Manage and interact with RESTful APIs.',
    },
  };

  mockMessages = {
    ...messages,
    ...mockRestfulTranslations,
  };
});

describe('RestfulClientPage', () => {
  it('renders the title with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <RestfulClientPage />
      </NextIntlClientProvider>
    );

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('RESTful Client');
  });

  it('renders the description with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <RestfulClientPage />
      </NextIntlClientProvider>
    );

    const descriptionElement = screen.getByText('Manage and interact with RESTful APIs.');
    expect(descriptionElement).toBeInTheDocument();
  });
});
