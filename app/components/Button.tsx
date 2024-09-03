import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white/30 hover:bg-white/40 active:shadow-none text-[white] shadow-custom-light font-light text-xl p-2.5 rounded-[20px] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
