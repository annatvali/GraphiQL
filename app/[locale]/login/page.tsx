import { useTranslations } from 'next-intl';
import FormLayout from '@/app/components/FormLayout';
import FormField from '@/app/components/FormField';
import { PATH } from '@/constants';

const Login = () => {
  const t = useTranslations('SIGN_IN');

  return (
    <FormLayout
      title={t('title')}
      buttonText={t('signin_btn')}
      buttonHref={PATH.MAIN}
      linkText={t('signup_link')}
      linkHref={PATH.REGISTER}
      linkDescription={t('descr')}
    >
      <FormField
        label={t('email_label')}
        type="email"
        name="email"
        id="email"
        placeholder="name@example.com"
        required
      />
      <FormField label={t('psw_label')} type="password" name="password" id="password" placeholder="••••••••" required />
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
              {t('remember_label')}
            </label>
          </div>
        </div>
        <a href="#" className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:underline">
          {t('forgot_psw')}
        </a>
      </div>
    </FormLayout>
  );
};

export default Login;
