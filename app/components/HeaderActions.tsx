import { useLocale } from 'next-intl';
import { Locale } from '@/i18n.config';
import { useTranslations } from 'next-intl';
import LanguageChanger from './LanguageChanger';
import ButtonLink from './ButtonLink';
import PropTypes from 'prop-types';
import { PATH } from '@/constants';

interface HeaderActionsProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isMenuOpen, closeMenu }) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('HEADER');

  return (
    <div className={`flex gap-6 ${isMenuOpen ? 'flex-col items-start' : 'flex-row items-center'}`}>
      <ButtonLink href={PATH.LOGIN} className={isMenuOpen ? 'w-full' : ''} onClick={closeMenu}>
        {t('signin')}
      </ButtonLink>
      <ButtonLink href={PATH.REGISTER} className={isMenuOpen ? 'w-full' : ''} onClick={closeMenu}>
        {t('signup')}
      </ButtonLink>
      <LanguageChanger locale={locale} closeMenu={closeMenu} className={isMenuOpen ? 'flex self-center' : ''} />
    </div>
  );
};

HeaderActions.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default HeaderActions;
