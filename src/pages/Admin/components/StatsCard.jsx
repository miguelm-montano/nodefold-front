export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4">
      <div className="flex items-center justify-center text-2xl shrink-0">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-ml font-medium text-black dark:text-gray-400">
          {title}
        </p>
        <p className="text-4xl font-bold text-gray-900 dark:text-white text-right w-full">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}
