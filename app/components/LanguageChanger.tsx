'use client';

import { useRouter, usePathname } from '@/navigation';
import { Locale, localeNames, locales } from '@/i18n.config';
import { Dropdown, DropdownItem } from './Dropdown';

interface LanguageChangerProps {
  locale: Locale;
}

const LanguageChanger = ({ locale }: LanguageChangerProps): React.ReactNode => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <Dropdown initialValue={localeNames[locale]} currentLanguage={localeNames[locale]} className="capitalize">
      {locales.map((localeItem) => (
        <DropdownItem key={localeItem} label={localeNames[localeItem]} onClick={() => handleChange(localeItem)} />
      ))}
    </Dropdown>
  );
};

export default LanguageChanger;
