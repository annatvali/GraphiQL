'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks';
import AuthenticatedPage from '@/app/components/AuthenticatedPage';
import UnauthenticatedPage from '@/app/components/UnauthenticatedPage';
import TeamMemberCard from '@/app/components/TeamMemberCard';
import { teamMembers } from '@/app/data/teamMembers';

const Main: React.FC = () => {
  const t = useTranslations('MAIN');

  const { user } = useAuth();

  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto pt-6">
      {user ? <AuthenticatedPage /> : <UnauthenticatedPage />}
      <section className="flex flex-col min-h-600 mt-8 pb-10 ">
        <h2 className="text-6xl text-center font-semibold">{t('project_title')}</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-32">
          <Image src={'/diamond.png'} width={350} height={350} alt="Diamond" className="w-auto h-auto" />
          <p className="text-lg max-w-360">{t('project')}</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-6xl text-center font-semibold">{t('team_title')}</h2>
        <ul className="flex flex-wrap justify-around gap-10 list-nonec mt-10">
          {teamMembers.map((elem, index) => (
            <TeamMemberCard key={index} member={elem} />
          ))}
        </ul>
      </section>
      <section className="flex flex-col min-h-600 mt-8 pb-10">
        <h2 className="text-6xl text-center font-semibold">{t('course_title')}</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-20">
          <Image src={'/atom.png'} width={300} height={300} alt="Atom" className="w-auto h-auto" />
          <p className="text-lg max-w-360">
            {t('course_1')}
            <a href="https://rs.school/courses/reactjs" className="text-blue-500 hover:underline">
              {t('course_link')}
            </a>
            {t('course_2')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;
