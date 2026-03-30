export default function AdminProfileCard({ user, onProfileClick }) {
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-stone-50 dark:bg-gray-900 rounded-2xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
      <div className="w-16 h-16 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center mb-3">
        <span className="text-xl font-bold text-white dark:text-gray-900">
          {initials}
        </span>
      </div>
      <p className="font-semibold text-gray-900 dark:text-white">
        {user?.name}
      </p>
      <p className="text-xs text-gray-400 mb-4">Admin</p>
      <button
        onClick={onProfileClick}
        className="text-sm mt-15 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        See your profile
      </button>
    </div>
  );
}
