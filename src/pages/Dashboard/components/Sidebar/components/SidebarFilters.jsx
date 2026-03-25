export default function SidebarFilters({
  filters,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="px-3 py-4 space-y-1 mt-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
            activeFilter === filter.key
              ? "bg-stone-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            {filter.icon}
            {filter.label}
          </span>
          <span className="text-xs text-gray-400">{filter.count}</span>
        </button>
      ))}
    </div>
  );
}
