import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home Component', () => {
  it('renders without crashing and contains "About the project" heading', () => {
    const { getByText } = render(<Home />);
    const heading = getByText('About the project');
    expect(heading).toBeInTheDocument();
  });
});
