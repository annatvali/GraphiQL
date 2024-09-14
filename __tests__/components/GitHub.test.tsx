import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GitHub from '@/app/components/GitHub';

describe('GitHub Component', () => {
  it('renders the SVG with the correct path data', () => {
    render(<GitHub />);

    const svgElement = screen.getByTestId('github-icon'); // Use the data-testid to find the SVG
    expect(svgElement).toBeInTheDocument();

    const pathElement = svgElement.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute(
      'd',
      'M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.13 6.84 9.43.5.09.68-.22.68-.49v-1.77c-2.79.61-3.37-1.34-3.37-1.34-.46-1.16-1.14-1.47-1.14-1.47-.93-.63.07-.62.07-.62 1.03.07 1.57 1.07 1.57 1.07.92 1.58 2.42 1.13 3.01.86.09-.66.36-1.13.65-1.39-2.29-.26-4.7-1.15-4.7-5.13 0-1.13.4-2.07 1.06-2.8-.11-.26-.46-1.31.1-2.73 0 0 .88-.28 2.88 1.07.84-.23 1.76-.34 2.67-.34.91 0 1.83.12 2.67.34 2.01-1.35 2.88-1.07 2.88-1.07.56 1.42.21 2.47.1 2.73.66.73 1.06 1.67 1.06 2.8 0 3.99-2.42 4.87-4.71 5.13.37.31.7.93.7 1.87v2.78c0 .27.18.58.69.48C21.13 20.13 24 16.41 24 12c0-5.52-4.48-10-10-10z'
    );
  });
});