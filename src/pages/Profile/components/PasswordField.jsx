export default function PasswordField({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
      />
    </div>
  );
}
