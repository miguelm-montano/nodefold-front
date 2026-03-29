export default function CreateFolderInput({
  showInput,
  setShowInput,
  newFolderName,
  setNewFolderName,
  onCreate,
}) {
  return (
    <div className="px-3 mb-3 mt-4">
      <button
        onClick={() => setShowInput(!showInput)}
        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        + Create new folder
      </button>

      {showInput && (
        <form onSubmit={onCreate} className="mt-2 px-1">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setShowInput(false);
                setNewFolderName("");
              }
            }}
            onBlur={() => {
              setShowInput(false);
              setNewFolderName("");
            }}
            placeholder="Folder name"
            autoFocus
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </form>
      )}
    </div>
  );
}
