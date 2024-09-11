import { useTranslations } from 'next-intl';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { PATH } from '@/constants';

const Register = () => {
  const t = useTranslations('SIGN_UP');

  return (
    <FormLayout
      title={t('title')}
      buttonText={t('signup_btn')}
      buttonHref={PATH.MAIN}
      linkText={t('signin_link')}
      linkHref={PATH.LOGIN}
      linkDescription={t('descr')}
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
