import FormLayout from '../components/FormLayout';
import FormField from '../components/FormField';

const Login = () => {
  return (
    <FormLayout
      title="Sign in to your account"
      buttonText="Sign in"
      linkText="Sign up"
      linkHref="/register"
      linkDescription="Don’t have an account yet?"
    >
      <FormField label="Email" type="email" name="email" id="email" placeholder="name@example.com" required />
      <FormField label="Password" type="password" name="password" id="password" placeholder="••••••••" required />
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
              Remember me
            </label>
          </div>
        </div>
        <a href="#" className="text-sm font-medium text-gray-500 dark:text-gray-300 hover:underline">
          Forgot password?
        </a>
      </div>
    </FormLayout>
  );
};

export default Login;
