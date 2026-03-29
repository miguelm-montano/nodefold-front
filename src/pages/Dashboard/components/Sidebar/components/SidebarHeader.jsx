import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function SidebarHeader({ isDark, toggleTheme }) {
  return (
    <div className="px-6 py-5 flex items-center justify-between">
      <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
        Nodefold
      </span>

      <button
        onClick={toggleTheme}
        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors -mr-1"
      >
        {isDark ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
