import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Page Component', () => {
  it('renders correctly with heading', async () => {
    const { getByRole } = render(Home());

    const heading = getByRole('heading', { name: /Welcome to Our API Client/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
