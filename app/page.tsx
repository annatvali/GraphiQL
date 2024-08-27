import Image from 'next/image';
export default function Home() {
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
          <li className="flex flex-col items-center w-320">
            <div className="p-3 bg-white">
              <Image src={'/valeriya.jpg'} width={400} height={350} alt="Valeriya" />
            </div>
            <div className="bg-white -mt-8 w-250 text-custom-purple text-center font-semibold p-3">
              <h3 className="text-[35px] font-semibold">Valeriya Tikhonova</h3>
              <p className="my-5 text-custom-light-gray">Front-end Developer</p>
              <p>
                My name is Valeria and I am a beginner frontend developer who strives to create beautiful and functional
                web applications. I am passionate about web development and constantly develop my skills in working with
                modern technologies. At the moment, I am actively studying: HTML, CSS, JavaScript and React. I am always
                open to new challenges and opportunities to grow as a developer and bring value to the team.
              </p>
            </div>
          </li>
          <li className="flex flex-col items-center w-320">
            <div className="p-3 bg-white">
              <Image src={'/rs-school-img.jpg'} width={300} height={100} alt="Ana" />
            </div>
            <div className="bg-white -mt-8 w-250 text-custom-purple text-center font-semibold p-3">
              <h3 className="text-[35px] font-semibold">Ana Tvaliashvili</h3>
              <p className="my-5 text-custom-light-gray">Team Lead / Front-end Developer</p>
              <p>
                Greetings! I am a motivated tech enthusiast transitioning into a career in technology, currently
                enrolled in courses at RSSchool in front-end development and AWS Cloud Developer training. With a strong
                commitment to self-development, I am eager to leverage my skills and knowledge in tech to drive
                innovative solutions and contribute to impactful projects.
              </p>
            </div>
          </li>
          <li className="flex flex-col items-center w-320">
            <div className="p-3 bg-white">
              <Image src={'/rs-school-img.jpg'} width={300} height={300} alt="Alexandra" />
            </div>
            <div className="bg-white -mt-8 w-250 text-custom-purple text-center font-semibold p-3">
              <h3 className="text-[35px] font-semibold">Alexandra Paramonova</h3>
              <p className="my-5 text-custom-light-gray">Front-end Developer</p>
              <p>
                Hi! I am a beginner front-end developer with a keen interest in building engaging and user-friendly web
                applications. I&apos;m excited to apply my skills to real-world projects, collaborate with others and
                take on new challenges in the field. I&apos;m grateful for the opportunity to learn from RS School,
                which has given me a strong foundation in HTML, CSS, and JavaScript!
              </p>
            </div>
          </li>
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
}
