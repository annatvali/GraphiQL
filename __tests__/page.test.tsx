import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from '@/app/page';

describe('Page Component', () => {
  it('renders correctly with heading', async () => {
    const { getByRole } = render(Page());

    const heading = getByRole('heading', { name: /est\/graphiql client/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
