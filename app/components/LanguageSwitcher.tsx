'use client';

import { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

enum Language {
  EN = 'EN',
  RU = 'RU',
}

interface LanguageSwitcherProps {
  className: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === Language.EN ? Language.RU : Language.EN));
  };

  return (
    <div className={`relative inline-block w-32 h-12 ${className}`}>
      <button
        onClick={toggleLanguage}
        className="relative w-full h-full rounded-full transition-all duration-300 bg-white/30 hover:bg-white/40 active:shadow-none text-white shadow-custom-light font-light text-xl p-2.5"
        aria-label={`Switch language to ${language === Language.EN ? 'Russian' : 'English'}`}
      >
        <span
          className={clsx(
            'absolute left-1 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 shadow-md',
            {
              'transform translate-x-0': language === Language.EN,
              'transform translate-x-20': language === Language.RU,
            }
          )}
          style={{
            backgroundImage: `url(${language === Language.EN ? '/flag-gb.svg' : '/flag-ru.svg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></span>
        <span
          className={clsx(
            'absolute top-1 w-6 h-10 flex items-center justify-center transition-transform duration-300 text-white font-semibold',
            {
              'transform translate-x-20': language === Language.EN,
              'transform translate-x-0': language === Language.RU,
            }
          )}
        >
          {language === Language.EN ? 'RU' : 'EN'}
        </span>
      </button>
    </div>
  );
};

LanguageSwitcher.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LanguageSwitcher;
