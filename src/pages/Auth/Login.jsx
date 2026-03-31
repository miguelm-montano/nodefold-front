import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { login as loginService } from "../../services/authService";

import useAuthForm from "./hooks/useAuthForm";

import AuthForm from "./components/AuthForm";
import AuthInput from "./components/AuthInput";
import Navbar from "../Home/components/Navbar";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { form, error, loading, handleChange, handleSubmit } = useAuthForm(
    { email: "", password: "" },
    loginService,
  );

  const onSuccess = (res) => {
    login(res.data.token, res.data.user);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <AuthForm
          title="Welcome back"
          subtitle="Sign in to your account"
          error={error}
          loading={loading}
          onSubmit={(e) => handleSubmit(e, onSuccess)}
          buttonText="Sign in"
          footerText="Don't have an account?"
          footerLink="/register"
          footerLinkText="Create one"
        >
          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthForm>
      </div>
    </div>
  );
}
