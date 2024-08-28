import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '@/app/components/Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<Button>Hello World</Button>);

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Hello World');
  });

  it('renders correctly with custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Custom Text</Button>);

    const button = getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveTextContent('Custom Text');
  });

  it('passes through HTML attributes', () => {
    const { getByRole } = render(<Button disabled>Disabled Button</Button>);

    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Disabled Button');
  });
});
