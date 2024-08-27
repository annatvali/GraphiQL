'use client';

import { useState } from 'react';
import Button from '../Button';

interface DropdownProps {
  initialValue: string;
  children: React.ReactNode;
  className: string;
}

export const Dropdown = ({ initialValue, className, children }: DropdownProps): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className="relative">
      <Button onClick={handleOpen} aria-haspopup="menu" aria-expanded="true" className={className}>
        {initialValue}
      </Button>
      {isOpen && (
        <div className="absolute mt-1.5 rounded-md bg-[rgba(255,255,255,0.3)]">
          <ul>{children}</ul>
        </div>
      )}
    </div>
  );
};
