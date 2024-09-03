import React from 'react';
import Image from 'next/image';
import AuthenticatedPage from './components/AuthenticatedPage';
import TeamMemberCard from './components/TeamMemberCard';
import { teamMembers } from './data/teamMembers';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto mt-10">
      <AuthenticatedPage />
      <section className="flex flex-col min-h-600 mt-8 pb-10 ">
        <h2 className="text-6xl text-center font-semibold">About the project</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-32">
          <Image src={'/diamond.png'} width={350} height={350} alt="Diamond" className="w-auto h-auto" />
          <p className="text-lg max-w-360">
            API Nexus is an intuitive tool that allows you to easily test and interact with your APIs. Our application
            provides a user-friendly interface for sending requests, viewing responses, and managing APIs.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-6xl text-center font-semibold">Our team</h2>
        <ul className="flex flex-wrap justify-around gap-10 list-nonec mt-10">
          {teamMembers.map((elem, index) => (
            <TeamMemberCard key={index} member={elem} />
          ))}
        </ul>
      </section>
      <section className="flex flex-col min-h-600 mt-8 pb-10">
        <h2 className="text-6xl text-center font-semibold">About the course</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-20">
          <Image src={'/atom.png'} width={300} height={300} alt="Atom" />
          <p className="text-lg max-w-360">
            This project is part of the ReactJS course from RS School
            <a href="https://rs.school/courses/reactjs" className="text-blue-500 hover:underline">
              {' ReactJS от RS School'}
            </a>
            . The course covers all the key aspects of React application development and helps students apply the
            acquired knowledge in practice through real projects.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
