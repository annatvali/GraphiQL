import { useLocale } from 'next-intl';
import { Locale } from '@/i18n.config';
import { useTranslations } from 'next-intl';
import LanguageChanger from './LanguageChanger';
import ButtonLink from './ButtonLink';
import PropTypes from 'prop-types';

interface HeaderActionsProps {
  isMenuOpen: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isMenuOpen }) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('HEADER');

  return (
    <div className={`flex gap-6 ${isMenuOpen ? 'flex-col items-start' : 'flex-row items-center'}`}>
      <LanguageChanger locale={locale} className={isMenuOpen ? 'flex self-center' : ''} />
      <ButtonLink href={'/login'} className={isMenuOpen ? 'w-full' : ''}>
        {t('signin')}
      </ButtonLink>
      <ButtonLink href={'/register'} className={isMenuOpen ? 'w-full' : ''}>
        {t('signup')}
      </ButtonLink>
    </div>
  );
};

HeaderActions.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};

export default HeaderActions;
