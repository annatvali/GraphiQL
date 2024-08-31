'use client';
import Image from 'next/image';

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

export const DropdownItem = ({ label, onClick }: DropdownItemProps): React.ReactNode => {
  const flagSrc = label.toLowerCase() === 'русский' ? '/flag-ru.svg' : '/flag-gb.svg';

  return (
    <li className="px-4 py-2 hover:bg-[rgba(255,255,255,0.4)] text-[white]">
      <button type="button" onClick={onClick} className="flex items-center space-x-2">
        <div className="flex items-center gap-2">
          <Image src={flagSrc} alt={`${label} flag`} width={20} height={20} />
          <span className="pr-4">{label}</span>
        </div>
      </button>
    </li>
  );
};
