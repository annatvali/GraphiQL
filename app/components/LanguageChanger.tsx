'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from '@/navigation';
import { Locale, localeNames, locales } from '@/i18n.config';
import { Dropdown } from './Dropdown';

interface LanguageChangerProps {
  locale: Locale;
  className?: string;
  closeMenu: () => void;
}

const items = locales.map((localeItem) => ({
  key: localeItem,
  value: (
    <div className="flex items-center gap-2">
      <Image
        src={`/flag-${localeItem}.svg`}
        alt={`${localeNames[localeItem]} flag`}
        className="w-5 h-5"
        width={20}
        height={20}
      />
      <span>{localeNames[localeItem]}</span>
    </div>
  ),
}));

export const LanguageChanger = ({ locale, className, closeMenu }: LanguageChangerProps): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
    closeMenu();
  };

  return (
    <Dropdown
      items={items}
      initialKey={locale}
      onItemSelect={(key) => handleChange(key)}
      className={`capitalize ${className ?? ''}`}
    />
  );
};
