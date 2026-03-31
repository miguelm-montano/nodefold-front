import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { register as registerService } from "../../services/authService";

import useAuthForm from "./hooks/useAuthForm";

import AuthForm from "./components/AuthForm";
import AuthInput from "./components/AuthInput";
import Navbar from "../Home/components/Navbar";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { form, error, errors, loading, handleChange, handleSubmit } =
    useAuthForm(
      {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      registerService,
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
          title="Create your account"
          subtitle="Start organizing your resources"
          error={error}
          loading={loading}
          onSubmit={(e) => handleSubmit(e, onSuccess)}
          buttonText="Create account"
          footerText="Already have an account?"
          footerLink="/login"
          footerLinkText="Sign in"
        >
          <AuthInput
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email?.[0]}
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password?.[0]}
          />

          <AuthInput
            label="Confirm password"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthForm>
      </div>
    </div>
  );
}
