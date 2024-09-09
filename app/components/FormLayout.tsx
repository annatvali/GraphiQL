import React from 'react';
import ButtonLink from './ButtonLink';
import { Link } from '@/navigation';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  linkText: string;
  linkHref: string;
  linkDescription: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  buttonText,
  buttonHref,
  linkText,
  linkHref,
  linkDescription,
}) => {
  return (
    <section className="flex items-center justify-center px-2 pt-16 pb-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow bg-purple-100 dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white text-custom-purple">{title}</h1>
          <form className="space-y-6" action="#">
            {children}
            <ButtonLink
              className="w-full block font-semibold bg-custom-purple border-2 border-transparent hover:text-custom-purple hover:border-custom-purple hover:bg-purple-50"
              href={buttonHref}
            >
              {buttonText}
            </ButtonLink>
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
