import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Main from '@/app/[locale]/page';

describe('Page Component', () => {
  beforeEach(() => {
    vi.mock('next-intl', () => ({
      useTranslations: vi.fn().mockReturnValue((key: string) => key),
    }));
  });

  it('renders correctly with heading', () => {
    const { getByRole } = render(Main());

    const heading = getByRole('heading', { name: 'title', level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
