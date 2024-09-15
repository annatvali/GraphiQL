import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { DropdownItem } from '@/app/components/Dropdown/DropdownItem';

describe('DropdownItem', () => {
  it('should render children correctly', () => {
    render(
      <DropdownItem onClick={() => undefined}>
        <span>Test Label</span>
      </DropdownItem>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = vi.fn();

    const user = userEvent.setup();

    render(
      <DropdownItem onClick={handleClick}>
        <span>Test Label</span>
      </DropdownItem>
    );

    await user.click(screen.getByText('Test Label'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply correct styles', () => {
    render(
      <DropdownItem onClick={() => undefined}>
        <span>Styled Item</span>
      </DropdownItem>
    );

    const item = screen.getByText('Styled Item');

    expect(item.closest('li')).toHaveClass('px-4 py-2 hover:bg-[rgba(255,255,255,0.4)] text-[white]');
  });
});
