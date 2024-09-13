import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DropdownItem } from '@/app/components/Dropdown';

describe('DropdownItem', () => {
  it('renders correctly with the appropriate flag', () => {
    render(<DropdownItem label="Русский" onClick={vi.fn()} />);

    expect(screen.getByAltText('Русский flag')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    render(<DropdownItem label="English" onClick={handleClick} />);

    await userEvent.click(screen.getByText('English'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
