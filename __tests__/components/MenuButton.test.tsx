import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import MenuButton from '@/app/components/MenuButton';

vi.mock('@heroicons/react/24/outline', () => ({
  Bars3Icon: () => <div data-testid="bars3-icon">Bars3Icon</div>,
  XMarkIcon: () => <div data-testid="xmark-icon">XMarkIcon</div>,
}));

describe('MenuButton', () => {
  it('renders Bars3Icon when isMenuOpen is false', () => {
    render(<MenuButton isMenuOpen={false} toggleMenu={vi.fn()} />);

    expect(screen.getByTestId('bars3-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('xmark-icon')).not.toBeInTheDocument();
  });

  it('renders XMarkIcon when isMenuOpen is true', () => {
    render(<MenuButton isMenuOpen={true} toggleMenu={vi.fn()} />);

    expect(screen.getByTestId('xmark-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('bars3-icon')).not.toBeInTheDocument();
  });

  it('calls toggleMenu when clicked', async () => {
    const toggleMenuMock = vi.fn();
    const user = userEvent.setup();

    render(<MenuButton isMenuOpen={false} toggleMenu={toggleMenuMock} />);

    await user.click(screen.getByRole('button'));

    expect(toggleMenuMock).toHaveBeenCalledTimes(1);
  });
});
