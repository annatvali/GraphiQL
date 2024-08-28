import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReactNode } from 'react';
import Main from '@/app/[locale]/page';

describe('Main page', () => {
  beforeEach(() => {
    vi.mock('next-intl', () => ({
      useTranslations: vi.fn().mockReturnValue((key: string) => key),
    }));

    vi.mock('@/app/components/AuthenticatedPage', () => {
      return {
        default: (): ReactNode => <h1>title</h1>,
      };
    });
  });

  it('renders correctly with heading', () => {
    const { getByRole } = render(Main({}));

    const heading = getByRole('heading', { name: 'title', level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
