import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '@/app/components/Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Hello World</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Hello World');
  });

  it('renders correctly with custom className', () => {
    render(<Button className="custom-class">Custom Text</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveTextContent('Custom Text');
  });

  it('passes through HTML attributes', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Disabled Button');
  });
});
