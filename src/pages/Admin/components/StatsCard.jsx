export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-4xl font-bold text-gray-900 dark:text-white">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}
