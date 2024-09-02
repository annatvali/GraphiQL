import React from 'react';
import Button from './Button';
import Link from 'next/link';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  linkText: string;
  linkHref: string;
  linkDescription: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  buttonText,
  linkText,
  linkHref,
  linkDescription,
}) => {
  return (
    <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow bg-purple-100 dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white text-custom-purple">{title}</h1>
          <form className="space-y-6" action="#">
            {children}
            <Button className="w-full font-semibold bg-custom-purple hover:text-custom-purple hover:border-2 hover:border-custom-purple">
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
