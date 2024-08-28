import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '@/app/[locale]/loading';

describe('Loading component', () => {
  it('renders correctly', () => {
    const { getByRole, getByText } = render(<Loading />);

    expect(getByRole('status')).toBeInTheDocument();

    const scrReaderText = getByText(/loading/i);
    expect(scrReaderText).toBeInTheDocument();
  });

  it('renders with expected aria-hidden attribute', () => {
    const { getByRole } = render(<Loading />);

    const svg = getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
