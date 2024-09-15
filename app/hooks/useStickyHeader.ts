import { useState, useEffect } from 'react';

export const useStickyHeader = (): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (): void => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isSticky;
};
