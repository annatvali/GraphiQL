import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
    })),
    usePathname: () => '/current-path',
  };
});

describe('LanguageChanger', () => {
  it('renders dropdown with correct initial value', () => {
    render(<LanguageChanger locale="en" closeMenu={vi.fn()} />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByAltText('English flag')).toBeInTheDocument();
  });

  it('calls handleChange and closeMenu when a new locale is selected', async () => {
    const closeMenu = vi.fn();
    const pushSpy = useRouter().push;

    render(<LanguageChanger locale="en" closeMenu={closeMenu} />);

    await userEvent.click(screen.getByRole('button'));

    await userEvent.click(screen.getByText('Русский'));

    expect(pushSpy).toHaveBeenCalledWith('/current-path', { locale: 'ru' });

    expect(closeMenu).toHaveBeenCalledTimes(1);
  });
});
