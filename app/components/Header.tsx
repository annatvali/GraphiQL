'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Button from './Button';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header
      className={clsx(
        'bg-gray-100 fixed top-0 left-0 w-full px-2 md:px-4 z-50 bg-white shadow-md transition-all duration-300',
        {
          'h-20': isSticky,
          'h-24': !isSticky,
        }
      )}
    >
      <div
        className={clsx('container flex items-center justify-between transition-all duration-300', {
          'py-2': isSticky,
          'py-4': !isSticky,
        })}
      >
        <Link
          href="/"
          className="relative inline-block transition-all text-2xl font-extrabold text-black mt-4 pb-2 before:content-[''] before:block before:w-0 before:h-1.5 before:bg-black before:transition-all before:duration-300 before:absolute before:bottom-0 before:left-0 hover:before:w-full before:skew-x-12 after:content-[''] after:block after:w-0 after:h-0 after:bg-black after:transition-all after:duration-300 after:absolute after:top-0 after:right-0 hover:after:w-1.5 hover:after:h-1.5 hover:after:rotate-45 hover:after:right-[86px] hover:text-purple-600"
        >
          API Nexus
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <div className="pt-4">
            <Button variant="primary" onClick={() => console.log('Sign Out button clicked!')} aria-label="Sign Out">
              Sign in
            </Button>
          </div>
        </div>
        <div className="md:hidden md:pt-0 pt-4">
          <Button variant="secondary" onClick={() => setMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? '✖' : '☰'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
