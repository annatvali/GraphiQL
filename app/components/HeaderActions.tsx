import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';
import PropTypes from 'prop-types';

interface HeaderActionsProps {
  isMenuOpen: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isMenuOpen }) => {
  const t = useTranslations('HEADER');

  return (
    <div className={`flex gap-6 ${isMenuOpen ? 'flex-col items-start' : 'flex-row items-center'}`}>
      <LanguageSwitcher className={isMenuOpen ? 'flex self-center' : ''} />
      <Button href={'/login'} className={isMenuOpen ? 'w-full' : ''}>
        {t('signin')}
      </Button>
      <Button href={'/register'} className={isMenuOpen ? 'w-full' : ''}>
        {t('signup')}
      </Button>
    </div>
  );
};

HeaderActions.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};

export default HeaderActions;
