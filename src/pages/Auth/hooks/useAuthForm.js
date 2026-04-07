import { useState } from "react";

export default function useAuthForm(initialState, submitFn, validate) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});

    if (!form.email.includes("@")) {
      setErrors({ email: ["Invalid email format"] });
      setLoading(false);
      return;
    }

    if (validate) {
      const clientErrors = validate(form);
      if (Object.keys(clientErrors).length > 0) {
        setErrors(clientErrors);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await submitFn(form);
      onSuccess(res);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
}
