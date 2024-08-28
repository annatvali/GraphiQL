import React from 'react';
import Image from 'next/image';
import TeamMemberCard from './components/TeamMemberCard';
import { teamMembers } from './data/teamMembers';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-xl px-4 mx-auto mt-10">
      <section className="flex flex-col min-h-600 mt-10 bg-[url('../public/cloud.png')] bg-no-repeat bg-custom-size bg-right sm-max:bg-[url('../public/lins.png')]">
        <h1 className="color-white text-[65px] font-medium">Welcome to API Nexus</h1>
        <p className="my-2 text-lg">A powerful tool for testing and interacting with your APIs.</p>
        <div className="flex gap-4 my-8">
          <button className="bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.4)] active:shadow-none text-[white] shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]">
            Sign In
          </button>
          <button className="bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.4)] active:shadow-none text-[white] shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]">
            Sign Up
          </button>
        </div>
      </section>
      <section className="flex flex-col min-h-600 mt-8 pb-10 ">
        <h2 className="text-[65px] text-center font-semibold">About the project</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-32">
          <Image src={'/diamond.png'} width={350} height={350} alt="Diamond" />
          <p className="text-base text-lg max-w-360">
            API Nexus is an intuitive tool that allows you to easily test and interact with your APIs. Our application
            provides a user-friendly interface for sending requests, viewing responses, and managing APIs.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-[65px] text-center font-semibold">Our team</h2>
        <ul className="flex flex-wrap justify-around gap-10 list-nonec mt-10">
          {teamMembers.map((elem, index) => (
            <TeamMemberCard key={index} member={elem} />
          ))}
        </ul>
      </section>
      <section className="flex flex-col min-h-600 mt-8 pb-10">
        <h2 className="text-[65px] text-center font-semibold">About the course</h2>
        <div className="flex flex-wrap gap-10 items-center justify-around mt-20">
          <Image src={'/atom.png'} width={300} height={300} alt="Atom" />
          <p className="text-base text-lg max-w-360">
            This project is part of the ReactJS course from RS School
            <a href="https://rs.school/courses/reactjs" className="text-blue-500 hover:underline">
              {' '}
              ReactJS от RS School
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
