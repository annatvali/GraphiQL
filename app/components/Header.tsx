import Button from './Button';

const Header = () => {
  return (
    <header className="flex justify-between max-w-1440px mx-auto items-center w-full h-[70px] border-b-2 border-white px-2.5">
      <div className="text-xl">API Nexus</div>
      <div className="flex gap-4 items-center">
        <Button>En</Button>
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
