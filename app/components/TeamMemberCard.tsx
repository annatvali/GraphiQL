import React from 'react';
import Image from 'next/image';
import { TeamMember } from '../data/teamMembers';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <li className="flex flex-col items-center w-320">
      <div className="p-3 bg-white">
        <Image src={member.photo} width={300} height={100} alt={member.name} />
      </div>
      <div className="bg-white -mt-8 w-250 text-custom-purple text-center font-semibold p-3">
        <h3 className="text-[35px] font-semibold">{member.name}</h3>
        <p className="my-5 text-custom-light-gray">{member.role}</p>
        <p>{member.bio}</p>
      </div>
    </li>
  );
};

export default TeamMemberCard;
