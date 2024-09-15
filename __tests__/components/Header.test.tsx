import { render, screen } from '@testing-library/react';
import { beforeAll, describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { useStickyHeader } from '@/app/hooks';
import Header from '@/app/components/Header';

vi.mock('@/app/hooks', () => ({
  useStickyHeader: vi.fn(),
}));

vi.mock('@/app/components/HeaderActions', () => ({
  default: ({ isMenuOpen, closeMenu }: { isMenuOpen: boolean; closeMenu: () => void }) => (
    <div>
      {isMenuOpen ? <button onClick={closeMenu}>Close Menu</button> : <button>Sign In</button>}
      <button>Sign Up</button>
      <button>Sign Out</button>
    </div>
  ),
}));

vi.mock('@/app/components/MenuButton', () => ({
  default: ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean; toggleMenu: () => void }) => (
    <button onClick={toggleMenu} aria-expanded={isMenuOpen} aria-haspopup="menu">
      Menu
    </button>
  ),
}));

vi.mock('@/app/components/BurgerMenu', () => ({
  default: ({ isMenuOpen, closeMenu }: { isMenuOpen: boolean; closeMenu: () => void }) => (
    <div>{isMenuOpen ? <button onClick={closeMenu}>Close Menu</button> : <div>Menu is closed</div>}</div>
  ),
}));

let messages: IntlMessages;
const locale = 'en';

beforeAll(async () => {
  messages = (await import('@/messages/en.json')).default;
});

describe('Header', () => {
  it('renders Header component with default classes', () => {
    vi.mocked(useStickyHeader).mockReturnValue(false);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('fixed top-0 z-50 w-full transition-all min-h-23 py-4 border-b-2 border-white');

    expect(screen.getByText('API Nexus')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Menu/i })).toBeInTheDocument();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Close Menu/i })).not.toBeInTheDocument();
  });

  it('applies sticky classes when useStickyHeader returns true', () => {
    vi.mocked(useStickyHeader).mockReturnValue(true);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    const header = screen.getByRole('banner');

    expect(header).toHaveClass('bg-custom-purple opacity-90 py-2 shadow-lg dark:bg-gray-800');
    expect(header).not.toHaveClass('py-4 border-b-2 border-white');
  });

  it('toggles the menu open state when MenuButton is clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(useStickyHeader).mockReturnValue(false);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.queryByRole('button', { name: /Close Menu/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Menu/i }));

    expect(screen.getByRole('button', { name: /Close Menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Menu/i }));

    expect(screen.queryByRole('button', { name: /Close Menu/i })).not.toBeInTheDocument();
  });

  it('renders HeaderActions, MenuButton, and BurgerMenu components correctly', () => {
    vi.mocked(useStickyHeader).mockReturnValue(false);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Menu/i })).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /Close Menu/i })).not.toBeInTheDocument();
  });

  it('ensures the BurgerMenu component behaves correctly when menu is toggled', async () => {
    const user = userEvent.setup();

    vi.mocked(useStickyHeader).mockReturnValue(false);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
      </NextIntlClientProvider>
    );

    await user.click(screen.getByRole('button', { name: /^Menu/i }));

    expect(screen.getByRole('button', { name: /Close Menu/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Close Menu/i }));

    expect(screen.getByText('Menu is closed')).toBeInTheDocument();
  });
});
