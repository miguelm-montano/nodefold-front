import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  subtitle,
  error,
  loading,
  onSubmit,
  buttonText,
  footerText,
  footerLink,
  footerLinkText,
  children,
}) {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold mb-1">{title}</h1>

      <p className="text-gray-500 dark:text-gray-400 mb-8">{subtitle}</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-4xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Loading..." : buttonText}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        {footerText}{" "}
        <Link
          to={footerLink}
          className="font-medium text-gray-900 dark:text-white underline underline-offset-4"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
