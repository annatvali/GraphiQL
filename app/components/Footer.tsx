import GitHub from './GitHub';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row ms:gap-2 justify-around items-center max-w-1440px mx-auto border-t-2 border-white w-full min-h-11">
      <Link
        href="https://github.com/your-profile"
        target="_blank"
        className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
        rel="noreferrer"
      >
        <GitHub />
        <span>GitHub</span>
      </Link>
      <p className="text-white font-light text-[20px]">
        &copy; <span id="year"></span> 2024
      </p>
      <Link
        href="https://rs.school/courses/reactjs"
        target="_blank"
        className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
        rel="noreferrer"
      >
        RS School
      </Link>
    </footer>
  );
};

export default Footer;
