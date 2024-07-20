import RegisterPage from 'apps/client/src/components/pages/register-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Register() {
  return <RegisterPage />;
}
