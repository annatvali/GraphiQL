import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '@/app/components/Footer';

vi.mock('@/navigation', () => ({
  Link: ({
    children,
    href,
    target,
    className,
    rel,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    className?: string;
    rel?: string;
  }) => (
    <a href={href} target={target} className={className} rel={rel}>
      {children}
    </a>
  ),
}));

vi.mock('@/app/components/GitHub', () => ({
  default: () => <svg data-testid="github-icon" />,
}));

describe('Footer', () => {
  it('renders GitHub link with the correct attributes and content', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/your-profile');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noreferrer');

    const githubIcon = screen.getByTestId('github-icon');
    expect(githubIcon).toBeInTheDocument();

    const githubText = screen.getByText('GitHub');
    expect(githubText).toBeInTheDocument();
  });

  it('renders RS School link with the correct attributes and content', () => {
    render(<Footer />);

    const rsSchoolLink = screen.getByRole('link', { name: 'RS School' });
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsSchoolLink).toHaveAttribute('target', '_blank');
    expect(rsSchoolLink).toHaveAttribute('rel', 'noreferrer');

    const rsSchoolText = screen.getByText('RS School');
    expect(rsSchoolText).toBeInTheDocument();
  });

  it('renders copyright text with the correct year', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/© 2024/);
    expect(copyrightText).toBeInTheDocument();
  });

  it('applies the correct styles to the footer and its children', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass(
      'flex flex-col md:flex-row ms:gap-2 justify-around items-center max-w-1440px mx-auto border-t-2 border-white w-full min-h-11'
    );

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveClass(
      'flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]'
    );

    const rsSchoolLink = screen.getByRole('link', { name: 'RS School' });
    expect(rsSchoolLink).toHaveClass(
      'flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]'
    );

    const copyrightText = screen.getByText(/© 2024/);
    expect(copyrightText).toHaveClass('text-white font-light text-[20px]');
  });
});
