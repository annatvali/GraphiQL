import FormLayout from '../components/FormLayout';
import FormField from '../components/FormField';

const Register = () => {
  return (
    <FormLayout
      title="Sign up for an account"
      buttonText="Sign up"
      linkText="Sign in"
      linkHref="/login"
      linkDescription="Already have an account?"
    >
      <FormField label="First Name" type="text" name="first-name" id="first-name" placeholder="First Name" required />
      <FormField label="Last Name" type="text" name="last-name" id="last-name" placeholder="Last Name" required />
      <FormField label="Email" type="email" name="email" id="email" placeholder="name@example.com" required />
      <FormField label="Password" type="password" name="password" id="password" placeholder="••••••••" required />
      <FormField
        label="Confirm Password"
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
