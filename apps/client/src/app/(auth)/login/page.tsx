import LoginPage from "apps/client/src/components/pages/login-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
   <LoginPage />
  );
}
