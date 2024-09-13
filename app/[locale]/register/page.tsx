'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseClientAuth } from '@/lib/firebase/client/config';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { SignUpFormData, signUpSchema } from '@/lib/schema';
import { PATH } from '@/constants';

const Register = () => {
  const tPage = useTranslations('SIGN_UP');
  const tValidation = useTranslations('VALIDATION');

  const schema = signUpSchema(tValidation);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (formValues: SignUpFormData) => {
    await Promise.resolve(true);

    console.log('Form submitted with values:', formValues);
    createUserWithEmailAndPassword(firebaseClientAuth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

    router.push(PATH.MAIN);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <FormLayout
      title={tPage('title')}
      buttonText={tPage('signup_btn')}
      buttonDisabled={!isValid || isSubmitting}
      onSubmit={handleFormSubmit}
      linkText={tPage('signin_link')}
      linkHref={PATH.LOGIN}
      linkDescription={tPage('descr')}
    >
      <FormField
        label={tPage('username_label')}
        type="text"
        id="username"
        placeholder={tPage('username_label')}
        required
        autoComplete="username"
        {...register('userName')}
      />
      {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}

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

      <FormField
        label={tPage('confirm_psw_label')}
        type="password"
        id="confirm-password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
    </FormLayout>
  );
};

export default Register;
