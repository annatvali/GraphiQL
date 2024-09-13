import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '@/app/components/Dropdown';

describe('Dropdown', () => {
  it('renders with initial value and current language flag', () => {
    render(
      <Dropdown initialValue="English" currentLanguage="English" className="test-class">
        <div>Test Child</div>
      </Dropdown>
    );

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByAltText('English flag')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('test-class');
  });

  it('toggles the dropdown menu on button click', async () => {
    render(
      <Dropdown initialValue="English" currentLanguage="English" className="test-class">
        <div>Test Child</div>
      </Dropdown>
    );

    expect(screen.queryByText('Test Child')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Test Child')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Test Child')).not.toBeInTheDocument();
  });
});
