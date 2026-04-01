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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <div className="relative flex flex-1 items-center justify-center px-4 -mt-10">
        {/* CUADRO AMARILLO */}
        <div className="absolute top-0 left-0 w-96 h-60 bg-[#FFB514] z-0"></div>
        {/* CUADRO NEGRO */}
        <div className="absolute bottom-0 right-0 w-176 h-20 bg-black z-0"></div>
        {/* CUADRO ROJO */}
        <div className="absolute bottom-20 right-0 w-30 h-30 bg-[#FF4C32] z-0"></div>
        <AuthForm
          title="Welcome back!"
          subtitle="Sign in to your account"
          error={error}
          loading={loading}
          onSubmit={(e) => handleSubmit(e, onSuccess)}
          buttonText="Sign in"
          footerText="Don't have an account?"
          footerLink="/register"
          footerLinkText="Register here"
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
