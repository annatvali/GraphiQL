interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...attributes }: ButtonProps): React.ReactNode => {
  return (
    <button
      type="button"
      {...attributes}
      className={`bg-white/30 hover:bg-white/40 active:shadow-none text-white shadow-[0px_0px_20px_-6px_rgba(255,255,255,0.82)] font-light text-xl p-2.5 rounded-[20px] ${className ?? ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
