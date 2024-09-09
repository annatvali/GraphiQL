import clsx from 'clsx';
import HeaderActions from './HeaderActions';
import PropTypes from 'prop-types';

interface BurgerMenuProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, closeMenu }) => {
  return (
    <div
      className={clsx('fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 flex flex-col', {
        'pointer-events-auto opacity-100': isMenuOpen,
        'pointer-events-none opacity-0': !isMenuOpen,
      })}
      onClick={closeMenu}
    >
      <div
        className={clsx(
          'fixed right-0 top-0 h-full w-3/4 max-w-xs bg-custom-purple p-4 shadow-lg transition-transform duration-300 dark:bg-gray-800 flex flex-col',
          {
            'translate-x-0 transform': isMenuOpen,
            'translate-x-full transform': !isMenuOpen,
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="mt-16 flex flex-col space-y-4">
          <HeaderActions isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        </nav>
      </div>
    </div>
  );
};

BurgerMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default BurgerMenu;
