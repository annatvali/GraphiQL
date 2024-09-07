import { useTranslations } from 'next-intl';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';

const Register = () => {
  const t = useTranslations('SIGN_UP');

  return (
    <FormLayout
      title={t('title')}
      buttonText={t('signup_btn')}
      buttonHref="/"
      linkText={t('signin_link')}
      linkHref="/login"
      linkDescription={t('descr')}
    >
      <FormField
        label={t('fname_label')}
        type="text"
        name="first-name"
        id="first-name"
        placeholder="First Name"
        required
      />
      <FormField
        label={t('lname_label')}
        type="text"
        name="last-name"
        id="last-name"
        placeholder="Last Name"
        required
      />
      <FormField
        label={t('email_label')}
        type="email"
        name="email"
        id="email"
        placeholder="name@example.com"
        required
      />
      <FormField label={t('psw_label')} type="password" name="password" id="password" placeholder="••••••••" required />
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
