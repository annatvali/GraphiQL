'use client';

import { useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface DropdownProps {
  initialValue: string;
  currentLanguage: string;
  children: React.ReactNode;
  className: string;
}

export const Dropdown = ({ initialValue, currentLanguage, className, children }: DropdownProps): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  const flagSrc = currentLanguage.toLowerCase() === 'русский' ? '/flag-ru.svg' : '/flag-gb.svg';

  return (
    <div className="relative">
      <Button onClick={handleOpen} aria-haspopup="menu" aria-expanded="true" className={className}>
        <div className="flex items-center space-x-2">
          <Image src={flagSrc} alt={`${currentLanguage} flag`} width={16} height={16} />
          <span>{initialValue}</span>
          {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </div>
      </Button>
      {isOpen && (
        <div className="absolute mt-1.5 rounded-md bg-[rgba(255,255,255,0.3)]">
          <ul>{children}</ul>
        </div>
      )}
    </div>
  );
};
