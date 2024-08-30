import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';
import PropTypes from 'prop-types';

interface HeaderActionsProps {
  isMenuOpen: boolean;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ isMenuOpen }) => {
  return (
    <div className={`flex gap-6 ${isMenuOpen ? 'flex-col items-start' : 'flex-row items-center'}`}>
      <LanguageSwitcher className={isMenuOpen ? 'flex self-center' : ''} />
      <Button href={'/sign-in'} className={isMenuOpen ? 'w-full' : ''}>
        Sign In
      </Button>
      <Button href={'/sign-up'} className={isMenuOpen ? 'w-full' : ''}>
        Sign Up
      </Button>
    </div>
  );
};

HeaderActions.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};

export default HeaderActions;
