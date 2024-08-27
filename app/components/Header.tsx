import { useLocale } from 'next-intl';
import { Locale } from '@/i18n.config';
import Button from './Button';
import LanguageChanger from './LanguageChanger';

const Header = () => {
  const locale = useLocale() as Locale;

  return (
    <header className="flex justify-between max-w-1440px mx-auto items-center w-full h-[70px] border-b-2 border-white px-2.5">
      <div>API Nexus</div>
      <div className="flex gap-4 items-center">
        <LanguageChanger locale={locale} />
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
};

export default Header;
