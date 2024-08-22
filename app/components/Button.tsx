// import React from 'react';

// interface ButtonProps {
//   variant: 'primary' | 'secondary';
//   onClick: () => void;
//   children: React.ReactNode;
// }

// const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
//   const baseClasses = 'px-4 py-2 rounded-sm focus:outline-none focus:ring';
//   const variantClasses =
//     variant === 'primary'
//       ? 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-blue-300'
//       : 'bg-purple-100 text-purple-500 hover:bg-purple-300 focus:ring-gray-300';

//   return (
//     <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
//       {children}
//     </button>
//   );
// };

// export default Button;

import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  const baseClasses = 'relative inline-block rounded-md transition-all bg-black';
  const variantClasses = variant === 'primary' ? 'bg- purple text-white' : 'text-black';

  const innerClasses =
    variant === 'primary'
      ? 'block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-purple-500 p-2 text-xl hover:-translate-y-3 active:translate-x-0 active:translate-y-0'
      : 'block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-white p-2 text-xl text-black hover:-translate-y-3 active:translate-x-0 active:translate-y-0';

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      <span className={innerClasses}>{children}</span>
    </button>
  );
};

export default Button;
