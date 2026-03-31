export default function TopTagsCard({ tags }) {
  const top3 = tags?.slice(0, 3) || [];

  return (
    <div className="h-full bg-stone-50 dark:bg-gray-900  rounded-2xl p-6 flex flex-col transform transition-transform duration-300 hover:scale-105">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        Top 3
      </h3>
      <p className="text-xs text-gray-400 mb-4">Most used tags</p>
      <div className="flex flex-col items-center justify-center gap-2 flex-1">
        {top3.map((tag) => (
          <p
            key={tag.id}
            className="text-3xl font-bold italic text-gray-900 dark:text-white "
          >
            {tag.name}
          </p>
        ))}
      </div>
    </div>
  );
}
