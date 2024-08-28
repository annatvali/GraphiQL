import GitHub from './GitHub';

const Footer = () => {
  return (
    <footer className="flex justify-around items-center max-w-1440px mx-auto border-t-2 border-white w-full h-[70px]">
      <a
        href="https://github.com/your-profile"
        target="_blank"
        className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
        rel="noreferrer"
      >
        <GitHub />
        <span>GitHub</span>
      </a>
      <p className="text-white font-light text-[20px]">
        &copy; <span id="year"></span> 2024
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        className="flex items-center gap-1.5 text-white hover:text-custom-gray font-light text-[20px]"
        rel="noreferrer"
      >
        RS School
      </a>
    </footer>
  );
};

export default Footer;
