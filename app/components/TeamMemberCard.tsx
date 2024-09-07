import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TeamMember } from '@/app/data/teamMembers';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const t = useTranslations('TEAM');

  const { id, photo } = member;

  return (
    <li className="flex flex-col items-center w-320">
      <div className="p-3 bg-white">
        <Image src={photo} width={300} height={100} alt={t(`${id}.name`)} />
      </div>
      <div className="bg-white -mt-8 w-250 text-custom-purple text-center font-semibold p-3">
        <h3 className="text-[35px] font-semibold">{t(`${id}.name`)}</h3>
        <p className="my-5 text-custom-light-gray">{t(`${id}.role`)}</p>
        <p>{t(`${id}.bio`)}</p>
      </div>
    </li>
  );
};

export default TeamMemberCard;
