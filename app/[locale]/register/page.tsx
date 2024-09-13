'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseClientAuth } from '@/lib/firebase/client/config';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { PATH } from '@/constants';

const Register = () => {
  const t = useTranslations('SIGN_UP');

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with values:', formValues);
    createUserWithEmailAndPassword(firebaseClientAuth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormLayout
      title={t('title')}
      buttonText={t('signup_btn')}
      buttonHref={PATH.MAIN}
      linkText={t('signin_link')}
      linkHref={PATH.LOGIN}
      linkDescription={t('descr')}
      type="submit"
      onSubmit={handleSubmit}
    >
      <FormField
        label={t('username_label')}
        type="text"
        name="username"
        id="username"
        placeholder={t('username_label')}
        required
      />
      <FormField
        label={t('email_label')}
        type="email"
        name="email"
        id="email"
        placeholder="name@example.com"
        required
        value={formValues.email}
        onChange={handleChange}
      />
      <FormField
        label={t('psw_label')}
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        required
        value={formValues.password}
        onChange={handleChange}
      />
      <FormField
        label={t('confirm_psw_label')}
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="••••••••"
        required
      />
    </FormLayout>
  );
};

export default Register;
