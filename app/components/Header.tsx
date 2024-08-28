const Header = () => {
  return (
    <header className="flex justify-between max-w-1440px mx-auto items-center w-full h-[70px] border-b-2 border-white px-2.5">
      <div className="text-xl">API Nexus</div>
      <div className="flex gap-4 items-center">
        <button className="bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.4)] active:shadow-none text-[white] shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]">
          En
        </button>
        <button className="bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.4)] active:shadow-none text-[white] shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]">
          Sign In
        </button>
        <button className="bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.4)] active:shadow-none text-[white] shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
