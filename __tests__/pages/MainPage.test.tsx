import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReactNode } from 'react';
import { useAuth } from '@/app/hooks';
import { signIn, signUp, signOut } from '@/lib/firebase/client/auth';
import Main from '@/app/[locale]/page';

vi.mock('@/lib/firebase/client/auth', async () => {
  const original = await vi.importActual('@/lib/firebase/client/auth');

  return {
    ...original,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
  };
});

vi.mock('@/app/hooks', () => {
  return {
    useAuth: vi.fn(),
  };
});

vi.mock('firebase/auth', async () => {
  const original = await vi.importActual('firebase/auth');

  return {
    ...original,
    getAuth: vi.fn(),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}));

vi.mock('@/app/components/AuthenticatedPage', () => ({
  default: (): ReactNode => <div>Authenticated Page</div>,
}));

vi.mock('@/app/components/UnauthenticatedPage', () => ({
  default: () => <div>Unauthenticated Page</div>,
}));

vi.mock('@/app/components/TeamMemberCard', () => ({
  default: ({ member }: { member: { name: string } }) => <div>{member.name}</div>,
}));

vi.mock('@/app/data/teamMembers', () => ({
  teamMembers: [{ name: 'Member 1' }, { name: 'Member 2' }],
}));

describe('Main page', () => {
  it('renders authenticated page when user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: '123', userName: 'Test User', email: '' },
      setUser: vi.fn(),
      signIn,
      signUp,
      signOut,
    });

    render(Main({}));

    expect(screen.getByText('Authenticated Page')).toBeInTheDocument();
    expect(screen.queryByText('Unauthenticated Page')).toBeNull();
  });

  it('renders unauthenticated page when user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    render(Main({}));

    expect(screen.getByText('Unauthenticated Page')).toBeInTheDocument();
    expect(screen.queryByText('Authenticated Page')).toBeNull();
  });

  it('renders project section with correct content', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    render(Main({}));

    expect(screen.getByText('project_title')).toBeInTheDocument();
    expect(screen.getByText('project')).toBeInTheDocument();
    expect(screen.getByAltText('Diamond')).toBeInTheDocument();
  });

  it('renders team members', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    render(Main({}));

    expect(screen.getByText('Member 1')).toBeInTheDocument();
    expect(screen.getByText('Member 2')).toBeInTheDocument();
  });

  it('renders course section with correct content', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, setUser: vi.fn(), signIn, signUp, signOut });

    render(Main({}));

    expect(screen.getByText('course_title')).toBeInTheDocument();
    expect(screen.getByText(/course_1/)).toBeInTheDocument();
    expect(screen.getByText('course_link')).toBeInTheDocument();
    expect(screen.getByText(/course_2/)).toBeInTheDocument();
    expect(screen.getByAltText('Atom')).toBeInTheDocument();
  });
});
