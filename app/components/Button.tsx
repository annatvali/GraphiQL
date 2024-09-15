import { cn } from '@/lib';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  className,
  disabled = false,
  type = 'button',
  ...attributes
}: ButtonProps): React.ReactNode => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...attributes}
      className={cn(
        'bg-white/30 text-white shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px]',
        {
          'cursor-not-allowed opacity-50': disabled,
          'hover:bg-white/40 active:shadow-none': !disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
