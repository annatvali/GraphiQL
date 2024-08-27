import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Page Component', () => {
  it('renders correctly with heading', () => {
    const { getByRole } = render(<Home />);

    const heading = getByRole('heading', { name: /Welcome to API Nexus/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
