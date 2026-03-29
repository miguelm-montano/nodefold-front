import { useState } from "react";
import { FolderIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FolderSelect({ folders, value, onChange }) {
  const [open, setOpen] = useState(false);

  const allFolders = folders.flatMap((f) => [
    { id: f.id, name: f.name, isSubfolder: false },
    ...(f.folders || []).map((sub) => ({
      id: sub.id,
      name: sub.name,
      parent: f.name,
      isSubfolder: true,
    })),
  ]);

  const selected = allFolders.find((f) => f.id === Number(value));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        {selected ? (
          <span className="flex items-center gap-2">
            <FolderIcon className="w-4 h-4 text-gray-400" />
            {selected.isSubfolder
              ? `${selected.parent} / ${selected.name}`
              : selected.name}
          </span>
        ) : (
          <span className="text-gray-400">Choose folder</span>
        )}
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 overflow-hidden max-h-48 overflow-y-auto">
          {folders.map((folder) => (
            <div key={folder.id}>
              {/* Carpeta padre */}
              <button
                type="button"
                onClick={() => {
                  onChange(folder.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  Number(value) === folder.id
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <FolderIcon className="w-4 h-4 text-gray-400" />
                {folder.name}
              </button>

              {/* Subcarpetas */}
              {folder.folders?.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    onChange(sub.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 pl-7 pr-3 py-2 text-sm transition-colors ${
                    Number(value) === sub.id
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <FolderIcon className="w-4 h-4 text-gray-400" />
                  {sub.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
