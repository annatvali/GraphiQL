'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Link } from '@/navigation';
import HeaderActions from './HeaderActions';
import BurgerMenu from './BurgerMenu';
import MenuButton from './MenuButton';
import useStickyHeader from '../hooks/useStickyHeader';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSticky = useStickyHeader();

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={clsx('fixed top-0 z-50 w-full transition-all', {
        'bg-custom-purple opacity-90 py-2 shadow-lg dark:bg-gray-800': isSticky,
        'py-4 border-b-2 border-white': !isSticky,
      })}
    >
      <div className="container max-w-screen-xl mx-auto flex items-baseline justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="relative inline-block transition-all text-2xl font-extrabold text-white mt-4 pb-2 before:content-[''] before:block before:w-0 before:h-1.5 before:bg-white before:transition-all before:duration-300 before:absolute before:bottom-0 before:left-0 hover:before:w-full before:skew-x-12 after:content-[''] after:block after:w-0 after:h-0 after:bg-white after:transition-all after:duration-300 after:absolute after:top-0 after:right-0 hover:after:w-1.5 hover:after:h-1.5 hover:after:rotate-45 hover:after:right-[86px]"
        >
          API Nexus
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <HeaderActions isMenuOpen={false} />
        </nav>
        <div className="md:hidden">
          <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      <BurgerMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
};

export default Header;
