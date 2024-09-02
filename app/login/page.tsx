import Button from '../components/Button';

const Login = () => {
  return (
    <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow bg-purple-100 dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl text-center font-bold text-gray-900 dark:text-white text-custom-purple">
            Sign in to your account
          </h1>
          <form className="space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="text-custom-purple block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-purple-50 text-custom-purplebg-custom-light-grey border border-purple-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-custom-purple block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-purple-50 bg-custom-light-grey border border-purple-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
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
            <Button className="w-full font-semibold bg-custom-purple hover:text-custom-purple hover:border-2 hover:border-custom-purple">
              Sign in
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
