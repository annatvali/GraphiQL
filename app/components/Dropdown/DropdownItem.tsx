'use client';

import { ReactNode } from 'react';

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
}

export const DropdownItem = ({ onClick, children }: DropdownItemProps): ReactNode => {
  return (
    <li className="px-4 py-2 hover:bg-[rgba(255,255,255,0.4)] text-[white]">
      <div onClick={onClick} role="menuitem" className="flex items-center space-x-2">
        {children}
      </div>
    </li>
  );
};
