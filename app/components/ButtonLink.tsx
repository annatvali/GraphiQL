import { Link } from '@/navigation';
import React from 'react';

interface ButtonLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, onClick, children, className }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light text-center font-light text-xl p-2.5 rounded-[20px] ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;