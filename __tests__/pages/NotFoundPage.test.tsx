import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { PATH } from '@/constants';
import NotFoundPage from '@/app/[locale]/not-found';

describe('NotFoundPage', () => {
  it('renders correctly with translations', async () => {
    const locale = 'en';

    const mockTranslations = {
      NOT_FOUND: {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist.',
        link_to_main: 'Go to Main Page',
      },
    };

    const messages = (await import('@/messages/en.json')).default;

    const mockMessages = {
      ...messages,
      ...mockTranslations,
    };

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <NotFoundPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByAltText('cat')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to Main Page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to Main Page/i })).toHaveAttribute('href', `${PATH.MAIN}${locale}`);
  });
});
