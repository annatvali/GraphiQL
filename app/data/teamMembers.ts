export interface TeamMember {
  photo: string;
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    photo: '/valeriya.jpg',
    name: 'Valeriya Tikhonova',
    role: 'Front-end Developer',
    bio: 'My name is Valeria and I am a beginner frontend developer who strives to create beautiful and functional web applications. I am passionate about web development and constantly develop my skills in working with modern technologies. At the moment, I am actively studying: HTML, CSS, JavaScript and React. I am always open to new challenges and opportunities to grow as a developer and bring value to the team.',
  },
  {
    photo: '/rs-school-img.jpg',
    name: 'Ana Tvaliashvili',
    role: 'Team Lead / Front-end Developer',
    bio: 'Greetings! I am a motivated tech enthusiast transitioning into a career in technology, currently enrolled in courses at RSSchool in front-end development and AWS Cloud Developer training. With a strong commitment to self-development, I am eager to leverage my skills and knowledge in tech to drive innovative solutions and contribute to impactful projects.',
  },
  {
    photo: '/rs-school-img.jpg',
    name: 'Alexandra Paramonova',
    role: 'Front-end Developer',
    bio: 'Hi! I am a beginner front-end developer with a keen interest in building engaging and user-friendly web applications. I&apos;m excited to apply my skills to real-world projects, collaborate with others and take on new challenges in the field. I&apos;m grateful for the opportunity to learn from RS School, which has given me a strong foundation in HTML, CSS, and JavaScript!',
  },
];
