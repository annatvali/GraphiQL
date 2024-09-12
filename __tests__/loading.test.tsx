import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '@/app/[locale]/loading';

describe('Loading component', () => {
  it('renders correctly', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    const scrReaderText = screen.getByText(/loading/i);
    expect(scrReaderText).toBeInTheDocument();
  });

  it('renders with expected aria-hidden attribute', () => {
    render(<Loading />);

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
