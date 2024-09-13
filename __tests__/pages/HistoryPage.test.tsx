import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import HistoryPage from '@/app/[locale]/history/page';

let mockMessages: IntlMessages;
const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockHistoryTranslations = {
    HISTORY: {
      title: 'History',
      description: 'View and manage your historical data.',
    },
  };

  mockMessages = {
    ...messages,
    ...mockHistoryTranslations,
  };
});

describe('HistoryPage', () => {
  it('renders the title with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('History');
  });

  it('renders the description with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );

    const descriptionElement = screen.getByText('View and manage your historical data.');
    expect(descriptionElement).toBeInTheDocument();
  });
});
