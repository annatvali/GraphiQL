'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { useAuth } from '@/app/hooks';
import { SignInFormData, signInSchema } from '@/lib/schema';
import { withAuthRedirect } from '@/app/hoc';
import { PATH } from '@/constants';
import { AppError } from '@/types';
import { getErrorMessage } from '@/lib/firebase/client';

const LoginPage = () => {
  const tPage = useTranslations('SIGN_IN');
  const tValidation = useTranslations('VALIDATION');
  const tErrors = useTranslations('ERRORS');

  const schema = signInSchema(tValidation);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { signIn, setUser } = useAuth();
  const router = useRouter();

  const [error, setError] = useState<AppError | null>(null);
  const errorMessage = error ? getErrorMessage(error, tErrors) : null;

  const onSubmit: SubmitHandler<SignInFormData> = async (formData) => {
    const { data, error } = await signIn(formData);

    if (!data) {
      setError(error);
      return;
    }

    const { user } = data;
    setUser(user);
    router.push(PATH.MAIN);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    void handleSubmit(onSubmit)(event);
  };

  return (
    <FormLayout
      title={tPage('title')}
      buttonText={tPage('signin_btn')}
      buttonDisabled={!isValid || isSubmitting}
      onSubmit={handleFormSubmit}
      linkText={tPage('signup_link')}
      linkHref={PATH.REGISTER}
      linkDescription={tPage('descr')}
    >
      <FormField
        label={tPage('email_label')}
        type="email"
        id="email"
        placeholder="name@example.com"
        required
        autoComplete="email"
        {...register('email')}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <FormField
        label={tPage('psw_label')}
        type="password"
        id="password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
        {...register('password')}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </FormLayout>
  );
};

const LoginPageWithAuth = withAuthRedirect(LoginPage, { redirectIfLoggedIn: true });

export default LoginPageWithAuth;
