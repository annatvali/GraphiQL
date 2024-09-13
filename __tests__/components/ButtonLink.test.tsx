import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ButtonLink from '@/app/components/ButtonLink';

vi.mock('@/navigation', () => ({
  Link: ({
    children,
    href,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

describe('ButtonLink', () => {
  it('renders the link with the correct href and text', () => {
    render(<ButtonLink href="/test-path">Click Me</ButtonLink>);

    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('applies additional className correctly', () => {
    render(
      <ButtonLink href="/test-path" className="extra-class">
        Click Me
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toHaveClass(
      'bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light text-center font-light text-xl p-2.5 rounded-[20px]'
    );
    expect(link).toHaveClass('extra-class');
  });

  it('handles onClick events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <ButtonLink href="#/test-path" onClick={handleClick}>
        Click Me
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Click Me' });
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without optional props', () => {
    render(<ButtonLink href="/test-path">Click Me</ButtonLink>);

    const link = screen.getByRole('link', { name: 'Click Me' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-path');
    expect(link).toHaveClass(
      'bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light text-center font-light text-xl p-2.5 rounded-[20px]'
    );
  });
});
