import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import HeaderActions from '@/app/components/HeaderActions';
import BurgerMenu from '@/app/components/BurgerMenu';

vi.mock('@/app/components/HeaderActions', () => ({
  default: vi.fn((): ReactNode => <div data-testid="header-actions" />),
}));

describe('BurgerMenu', () => {
  const closeMenuMock = vi.fn();

  it('renders the BurgerMenu when menu is open', () => {
    render(<BurgerMenu isMenuOpen={true} closeMenu={closeMenuMock} />);

    const menu = screen.getByRole('navigation');
    const menuContainer = screen.getByTestId('menu-container');

    expect(menu).toBeInTheDocument();
    expect(menuContainer).toBeInTheDocument();
    expect(menuContainer).toHaveClass('translate-x-0');
  });

  it('does not render the menu when isMenuOpen is false', () => {
    render(<BurgerMenu isMenuOpen={false} closeMenu={closeMenuMock} />);

    const backdrop = screen.getByTestId('backdrop');
    expect(backdrop).toHaveClass('opacity-0 pointer-events-none');
  });

  it('renders with correct classes when menu is open', () => {
    render(<BurgerMenu isMenuOpen={true} closeMenu={closeMenuMock} />);

    const backdrop = screen.getByTestId('backdrop');
    expect(backdrop).toHaveClass('opacity-100 pointer-events-auto');
  });

  it('calls closeMenu when clicking outside the menu (backdrop)', async () => {
    const user = userEvent.setup();

    render(<BurgerMenu isMenuOpen={true} closeMenu={closeMenuMock} />);

    const backdrop = screen.getByTestId('backdrop');

    await user.click(backdrop);

    expect(closeMenuMock).toHaveBeenCalled();
  });

  it('does not call closeMenu when clicking inside the menu', async () => {
    const user = userEvent.setup();

    render(<BurgerMenu isMenuOpen={true} closeMenu={closeMenuMock} />);

    const menu = screen.getByRole('navigation');

    await user.click(menu);

    expect(closeMenuMock).not.toHaveBeenCalled();
  });

  it('renders HeaderActions component with correct props', () => {
    render(<BurgerMenu isMenuOpen={true} closeMenu={closeMenuMock} />);

    expect(HeaderActions).toHaveBeenCalledWith({ isMenuOpen: true, closeMenu: closeMenuMock }, expect.anything());
  });
});
