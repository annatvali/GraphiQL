'use client';

import { useRouter, usePathname } from '@/navigation';
import { Locale, localeNames, locales } from '@/i18n.config';
import { Dropdown, DropdownItem } from './Dropdown';

interface LanguageChangerProps {
  locale: Locale;
  className?: string;
  closeMenu: () => void;
}

export const LanguageChanger = ({ locale, className, closeMenu }: LanguageChangerProps): React.ReactNode => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
    closeMenu();
  };

  return (
    <Dropdown
      initialValue={localeNames[locale]}
      currentLanguage={localeNames[locale]}
      className={`capitalize ${className ?? ''}`}
    >
      {locales.map((localeItem) => (
        <DropdownItem key={localeItem} label={localeNames[localeItem]} onClick={() => handleChange(localeItem)} />
      ))}
    </Dropdown>
  );
};
