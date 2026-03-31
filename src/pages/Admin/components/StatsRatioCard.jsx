export default function StatsRatioCard({ title, subtitle, value }) {
  return (
    <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-xs text-gray-400 mt-1 mb-4">{subtitle}</p>
      <p className="text-5xl font-bold text-gray-900 dark:text-white text-right">
        {value ?? "—"}
      </p>
    </div>
  );
}
