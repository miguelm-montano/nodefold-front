import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import FilterMenu from "./resources/FilterMenu";

export default function DashboardHeader({
  activeFolder,
  folders,
  onFolderSelect,
  onSearch,
  onAddResource,
}) {
  const currentIndex = folders.findIndex((f) => f.id === activeFolder?.id);

  const handlePrev = () => {
    if (currentIndex > 0) onFolderSelect(folders[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < folders.length - 1)
      onFolderSelect(folders[currentIndex + 1].id);
  };

  return (
    <header className="h-[62px] border-gray-200 dark:border-gray-800 flex items-center px-6 gap-4">
      {/* Navegación */}
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-1 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= folders.length - 1}
          className="p-1 rounded text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Nombre carpeta activa */}
      {activeFolder && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {activeFolder.name}
        </span>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add resource */}
      <button
        onClick={onAddResource}
        className="p-1.5 rounded-lg text-gray-800 font-extrabold hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <PlusIcon className="w-5 h-5 dark:text-white" />
      </button>

      {/* Filters */}
      <FilterMenu />

      {/* Search */}
      <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-900 w-56 mr-2">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search resources..."
          onChange={(e) => onSearch(e.target.value)}
          className="text-sm bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 w-full"
        />
      </div>
    </header>
  );
}
