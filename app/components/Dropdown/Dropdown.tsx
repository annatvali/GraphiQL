import { useState, ReactNode, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import { DropdownItem } from './DropdownItem';
import Button from '@/app/components/Button';

interface DropdownItem<TKey> {
  key: TKey;
  value: ReactNode;
}

interface DropdownProps<TKey> {
  items: DropdownItem<TKey>[];
  initialKey: TKey;
  onItemSelect: (key: TKey) => void;
  className?: string;
}

export const Dropdown = <TKey extends string>({
  items,
  initialKey,
  onItemSelect,
  className,
}: DropdownProps<TKey>): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<TKey | null>(null);

  const t = useTranslations('COMPONENTS');

  useEffect(() => {
    const initialItem = items.find((item) => item.key === initialKey);
    if (initialItem) {
      setSelectedItemKey(initialItem.key);
    }
  }, [initialKey, items]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (key: TKey) => {
    setSelectedItemKey(key);
    setIsOpen(false);
    onItemSelect(key);
  };

  const selectedItem = items.find((item) => item.key === selectedItemKey);

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        className={className}
      >
        <div className="flex items-center space-x-2">
          <div>{selectedItem ? selectedItem.value : t('dropdown-empty-label')}</div>
          {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
        </div>
      </Button>
      {isOpen && (
        <div className="absolute mt-1.5 rounded-md bg-[rgba(255,255,255,0.3)]" role="menu">
          <ul>
            {items.map((item) => (
              <DropdownItem key={item.key} onClick={() => handleSelect(item.key)}>
                {item.value}
              </DropdownItem>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
