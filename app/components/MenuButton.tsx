import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const MenuButton: React.FC<{ isMenuOpen: boolean; toggleMenu: () => void }> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button onClick={toggleMenu} className="relative z-50 text-white">
      {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
    </button>
  );
};

MenuButton.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuButton;
