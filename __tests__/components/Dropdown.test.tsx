import { screen, waitFor } from '@testing-library/react';
import { renderWithTranslations } from '@/__tests__/test-utils';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '@/app/components/Dropdown';

vi.mock('@heroicons/react/24/solid', () => ({
  ChevronDownIcon: () => <svg data-testid="chevron-down-icon" />,
  ChevronUpIcon: () => <svg data-testid="chevron-up-icon" />,
}));

const mockMessages = {
  COMPONENTS: {
    'dropdown-empty-label': 'Select an option',
  },
};

describe('Dropdown Component', () => {
  it('should render with the initial selected value', () => {
    renderWithTranslations(
      <Dropdown
        items={[
          { key: 'option1', value: <span>Option 1</span> },
          { key: 'option2', value: <span>Option 2</span> },
        ]}
        initialKey="option1"
        onItemSelect={() => undefined}
      />,
      { messages: mockMessages }
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should open and close when the button is clicked', async () => {
    const user = userEvent.setup();

    renderWithTranslations(
      <Dropdown
        items={[
          { key: 'option1', value: <span>Option 1</span> },
          { key: 'option2', value: <span>Option 2</span> },
        ]}
        initialKey="option1"
        onItemSelect={() => undefined}
      />,
      { messages: mockMessages }
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getAllByText('Option 1')).toHaveLength(2);
    expect(screen.getByText('Option 2')).toBeVisible();

    await user.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(screen.getAllByText('Option 1')).toHaveLength(1);
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('should call onItemSelect with the correct key when an item is clicked', async () => {
    const handleItemSelect = vi.fn();

    renderWithTranslations(
      <Dropdown
        items={[
          { key: 'option1', value: <span>Option 1</span> },
          { key: 'option2', value: <span>Option 2</span> },
        ]}
        initialKey="option1"
        onItemSelect={handleItemSelect}
      />,
      { messages: mockMessages }
    );

    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByText('Option 2'));

    expect(handleItemSelect).toHaveBeenCalledWith('option2');
  });

  it('should display the correct icon based on open/closed state', async () => {
    const user = userEvent.setup();

    renderWithTranslations(
      <Dropdown
        items={[
          { key: 'option1', value: <span>Option 1</span> },
          { key: 'option2', value: <span>Option 2</span> },
        ]}
        initialKey="option1"
        onItemSelect={() => undefined}
      />,
      { messages: mockMessages }
    );

    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('chevron-up-icon')).toBeInTheDocument();
  });
});
