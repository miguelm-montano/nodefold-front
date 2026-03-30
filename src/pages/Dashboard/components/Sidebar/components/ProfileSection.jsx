import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function ProfileSection({ user, onLogout, onShowProfile }) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-4 space-y-1">
      <button
        onClick={onShowProfile}
        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2"
      >
        <UserCircleIcon className="w-5 h-5 text-black dark:text-white" />{" "}
        {user?.name}
      </button>

      <button
        onClick={onLogout}
        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2"
      >
        <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}
