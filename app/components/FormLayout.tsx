import React from 'react';
import { cn } from '@/lib';
import Button from '@/app/components/Button';
import { Link } from '@/navigation';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonDisabled: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  linkText: string;
  linkHref: string;
  linkDescription: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  buttonText,
  buttonDisabled,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
}) => {
  return (
    <section className="flex items-center justify-center px-2 pt-16 pb-12">
      <div className="w-full max-w-md rounded-lg shadow bg-purple-100 dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl text-center font-bold dark:text-white text-custom-purple">{title}</h1>
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            {children}
            <Button
              type="submit"
              disabled={buttonDisabled}
              className={cn('w-full block font-semibold bg-custom-purple border-2 border-transparent', {
                'bg-gray-300 text-gray-500 cursor-not-allowed': buttonDisabled,
                'hover:text-custom-purple hover:border-custom-purple hover:bg-purple-50': !buttonDisabled,
              })}
            >
              {buttonText}
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {linkDescription}{' '}
              <Link href={linkHref} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                {linkText}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
