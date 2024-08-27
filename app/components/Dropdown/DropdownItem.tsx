'use client';

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

export const DropdownItem = ({ label, onClick }: DropdownItemProps): React.ReactNode => {
  return (
    <li className="px-4 py-2 hover:bg-[rgba(255,255,255,0.4)] text-[white]">
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </li>
  );
};
