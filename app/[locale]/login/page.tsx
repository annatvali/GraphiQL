'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { useAuth } from '@/app/hooks';
import { SignInFormData, signInSchema } from '@/lib/schema';
import { PATH, SESSION_COOKIE } from '@/constants';
import { withAuthRedirect } from '@/app/hoc';

const sessionDurationHours = Math.floor(SESSION_COOKIE.MAX_AGE_SECONDS / 3600);

const LoginPage = () => {
  const tPage = useTranslations('SIGN_IN');
  const tValidation = useTranslations('VALIDATION');

  const schema = signInSchema(tValidation);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { signIn } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data);
    router.push(PATH.MAIN);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      <div className="flex justify-center ml-3 text-sm">
        <p className="text-gray-500 dark:text-gray-300">{tPage('login_duration', { sessionDurationHours })}</p>
      </div>
    </FormLayout>
  );
};

const LoginPageWithAuth = withAuthRedirect(LoginPage, { redirectIfLoggedIn: true });

export default LoginPageWithAuth;
