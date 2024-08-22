import React, { useState } from 'react';
import clsx from 'clsx';

enum Language {
  EN = 'EN',
  RU = 'RU',
}

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === Language.EN ? Language.RU : Language.EN));
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleLanguage}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={clsx(
          'relative w-24 h-12 bg-white border-2 border-black rounded-md shadow-lg transition-all duration-300',
          'flex items-center justify-between',
          'hover:bg-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50',
          {
            'transform translate-y-1': isPressed,
          }
        )}
      >
        <span
          className={clsx('absolute left-0 w-1/2 h-full flex items-center justify-center transition-all duration-500', {
            'bg-yellow-500 text-white': language === Language.EN,
            'bg-white text-black': language === Language.RU,
          })}
        >
          EN
        </span>
        <span
          className={clsx(
            'absolute right-0 w-1/2 h-full flex items-center justify-center transition-all duration-500',
            {
              'bg-yellow-500 text-white': language === Language.RU,
              'bg-white text-black': language === Language.EN,
            }
          )}
        >
          RU
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
