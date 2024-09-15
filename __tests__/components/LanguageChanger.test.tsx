import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithTranslations } from '@/__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import { useRouter } from '@/navigation';
import { LanguageChanger } from '@/app/components/LanguageChanger';

vi.mock('@/navigation', async () => {
  const original = await vi.importActual('@/navigation');
  const pushMock = vi.fn();

  return {
    ...original,
    useRouter: vi.fn(() => ({
      push: pushMock,
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      query: {},
      pathname: '/',
    })),
    usePathname: () => '/current-path',
  };
});

vi.mock('@/i18n.config', () => ({
  locales: ['en', 'ru'],
  localeNames: {
    en: 'English',
    ru: 'Русский',
  },
  localePrefix: ['en', 'ru'],
}));

const mockMessages = {
  COMPONENTS: {
    'dropdown-empty-label': 'Select an option',
  },
};

describe('LanguageChanger Component', () => {
  const closeMenu = vi.fn();

  it('renders with initial locale and dropdown works', async () => {
    const pushMock = useRouter().push;

    const user = userEvent.setup();

    renderWithTranslations(<LanguageChanger locale="en" closeMenu={closeMenu} />, { messages: mockMessages });

    expect(screen.getByText('English')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getAllByText('English')).toHaveLength(2);
    expect(screen.getByText('Русский')).toBeVisible();

    await user.click(screen.getByText('Русский'));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/current-path', { locale: 'ru' });
    });

    expect(closeMenu).toHaveBeenCalled();
  });

  it('displays the correct flag images', async () => {
    const user = userEvent.setup();

    renderWithTranslations(<LanguageChanger locale="en" closeMenu={closeMenu} />, { messages: mockMessages });

    await user.click(screen.getByRole('button'));

    expect(screen.getAllByAltText('English flag')).toHaveLength(2);
    expect(screen.getByAltText('Русский flag')).toBeInTheDocument();
  });
});
