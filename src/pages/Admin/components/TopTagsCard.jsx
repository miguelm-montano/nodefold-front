export default function TopTagsCard({ tags }) {
  const top3 = tags?.slice(0, 3) || [];

  return (
    <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        Top 3
      </h3>
      <p className="text-xs text-gray-400 mb-4">Most used tags</p>
      <div className="space-y-2">
        {top3.map((tag) => (
          <p
            key={tag.id}
            className="text-2xl font-bold italic text-gray-900 dark:text-white"
          >
            {tag.name}
          </p>
        ))}
      </div>
    </div>
  );
}
