import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import GraphQLClientPage from '@/app/[locale]/graphql-client/page';

let mockMessages: IntlMessages;
const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockGraphiQlTranslations = {
    GRAPHQL_CLIENT: {
      title: 'GraphQL Client',
      description: 'Explore and interact with GraphQL APIs.',
    },
  };

  mockMessages = {
    ...messages,
    ...mockGraphiQlTranslations,
  };
});

describe('GraphQLClientPage', () => {
  it('renders the title with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <GraphQLClientPage />
      </NextIntlClientProvider>
    );

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('GraphQL Client');
  });

  it('renders the description with the correct translation', () => {
    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <GraphQLClientPage />
      </NextIntlClientProvider>
    );

    const descriptionElement = screen.getByText('Explore and interact with GraphQL APIs.');
    expect(descriptionElement).toBeInTheDocument();
  });
});
