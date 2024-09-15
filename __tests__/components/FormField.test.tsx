import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FormField from '@/app/components/FormField';

describe('FormField Component', () => {
  it('renders with the correct label and placeholder', () => {
    render(<FormField label="Username" type="text" name="username" id="username" placeholder="Enter your username" />);

    const labelElement = screen.getByLabelText('Username');
    const inputElement = screen.getByPlaceholderText('Enter your username');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with required attribute if specified', () => {
    render(
      <FormField
        label="Password"
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        required
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter your password');

    expect(inputElement).toBeRequired();
  });

  it('handles user input correctly', async () => {
    render(<FormField label="Email" type="email" name="email" id="email" placeholder="Enter your email" />);

    const inputElement = screen.getByPlaceholderText('Enter your email');
    await userEvent.type(inputElement, 'test@example.com');

    expect(inputElement).toHaveValue('test@example.com');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <FormField label="Address" type="text" name="address" id="address" placeholder="Enter your address" ref={ref} />
    );

    expect(ref).toHaveBeenCalled();
  });

  it('applies correct styles', () => {
    render(<FormField label="Phone" type="tel" name="phone" id="phone" placeholder="Enter your phone number" />);

    const inputElement = screen.getByPlaceholderText('Enter your phone number');
    expect(inputElement).toHaveClass(
      'bg-purple-50 bg-custom-light-grey border border-purple-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    );
  });
});
