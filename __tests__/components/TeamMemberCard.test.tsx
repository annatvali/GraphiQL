import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { TeamMember } from '@/app/data/teamMembers';
import TeamMemberCard from '@/app/components/TeamMemberCard';

let mockMessages: IntlMessages;

const locale = 'en';

beforeAll(async () => {
  const messages = (await import('@/messages/en.json')).default;

  const mockTeamTranslations = {
    TEAM: {
      valeriya: {
        name: 'Valeriya',
        role: 'Designer',
        bio: 'Valeriya is a talented designer with a passion for creativity.',
      },
      ana: {
        name: 'Ana',
        role: 'Project Manager',
        bio: 'Ana manages projects with exceptional organizational skills.',
      },
      alex: {
        name: 'Alex',
        role: 'Developer',
        bio: 'Alex specializes in frontend development with a keen eye for detail.',
      },
    },
  };

  mockMessages = {
    ...messages,
    ...mockTeamTranslations,
  };
});

describe('TeamMemberCard', () => {
  it('renders the image with the correct src and alt attributes', () => {
    const member: TeamMember = {
      id: 'valeriya',
      photo: '/valeriya.jpg',
    };

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <TeamMemberCard member={member} />
      </NextIntlClientProvider>
    );

    const image = screen.getByAltText('Valeriya');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('valeriya.jpg'));
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '100');
  });

  it('renders the correct name, role, and bio from translations', () => {
    const member: TeamMember = {
      id: 'ana',
      photo: '/rs-school-img.jpg',
    };

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <TeamMemberCard member={member} />
      </NextIntlClientProvider>
    );

    const nameElement = screen.getByRole('heading', { level: 3, name: 'Ana' });
    expect(nameElement).toBeInTheDocument();

    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    expect(screen.getByText('Ana manages projects with exceptional organizational skills.')).toBeInTheDocument();
  });

  it('applies the correct styles to the component', () => {
    const member: TeamMember = {
      id: 'alex',
      photo: '/rs-school-img.jpg',
    };

    render(
      <NextIntlClientProvider locale={locale} messages={mockMessages}>
        <TeamMemberCard member={member} />
      </NextIntlClientProvider>
    );

    const card = screen.getByTestId('team-member-card');
    expect(card).toHaveClass('flex flex-col items-center w-320');

    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toHaveClass('p-3 bg-white');

    const textContainer = screen.getByTestId('text-container');
    expect(textContainer).toHaveClass('-mt-8 w-275 text-custom-purple text-center font-semibold p-3');
  });
});
