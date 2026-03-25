export default function FolderItem({
  folder,
  editingFolder,
  setEditingFolder,
  editName,
  setEditName,
  folderMenu,
  setFolderMenu,
  creatingSubfolder,
  setCreatingSubfolder,
  subfolderName,
  setSubfolderName,
  activeFolderId,
  onFolderSelect,
  handleUpdateFolder,
  handleDeleteFolder,
  handleCreateSubfolder,
}) {
  return (
    <div className="relative group">
      {/* Edition Mode */}
      {editingFolder === folder.id ? (
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleUpdateFolder(folder.id, editName, () => {
                setEditingFolder(null);
                setEditName("");
              });
            if (e.key === "Escape") {
              setEditingFolder(null);
              setEditName("");
            }
          }}
          onBlur={() => {
            setEditingFolder(null);
            setEditName("");
          }}
          autoFocus
          className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-50 dark:focus:ring-gray-600"
        />
      ) : (
        <button
          onClick={() => onFolderSelect(folder.id)}
          onDoubleClick={() => {
            setEditingFolder(folder.id);
            setEditName(folder.name);
            setFolderMenu(null);
          }}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
            activeFolderId === folder.id
              ? "bg-stone-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
          }`}
        >
          <span className="truncate">📁 {folder.name}</span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setFolderMenu(folderMenu === folder.id ? null : folder.id);
            }}
            className="text-xs text-gray-400 group-hover:hidden"
          >
            {folder.total_resources_count}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setFolderMenu(folderMenu === folder.id ? null : folder.id);
            }}
            className="text-xs text-gray-400 hidden group-hover:block"
          >
            •••
          </span>
        </button>
      )}

      {/* Subfolders anidados */}
      {folder.folders?.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {folder.folders.map((sub) => (
            <FolderItem
              key={sub.id}
              folder={sub}
              editingFolder={editingFolder}
              setEditingFolder={setEditingFolder}
              editName={editName}
              setEditName={setEditName}
              folderMenu={folderMenu}
              setFolderMenu={setFolderMenu}
              creatingSubfolder={creatingSubfolder}
              setCreatingSubfolder={setCreatingSubfolder}
              subfolderName={subfolderName}
              setSubfolderName={setSubfolderName}
              activeFolderId={activeFolderId}
              onFolderSelect={onFolderSelect}
              handleUpdateFolder={handleUpdateFolder}
              handleDeleteFolder={handleDeleteFolder}
              handleCreateSubfolder={handleCreateSubfolder}
            />
          ))}
        </div>
      )}

      {/* Input crear subfolder */}
      {creatingSubfolder === folder.id && (
        <div className="ml-4 mt-1">
          <form
            onSubmit={(e) =>
              handleCreateSubfolder(e, folder.id, subfolderName, () => {
                setCreatingSubfolder(null);
                setSubfolderName("");
              })
            }
          >
            <input
              type="text"
              value={subfolderName}
              onChange={(e) => setSubfolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setCreatingSubfolder(null);
                  setSubfolderName("");
                }
              }}
              onBlur={() => {
                setCreatingSubfolder(null);
                setSubfolderName("");
              }}
              placeholder="Subfolder name"
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </form>
        </div>
      )}

      {/* Mini menu carpeta padre */}
      {folderMenu === folder.id && (
        <div className="absolute right-0 top-8 z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 w-40">
          <button
            onClick={() => {
              setEditingFolder(folder.id);
              setEditName(folder.name);
              setFolderMenu(null);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Edit name
          </button>
          <button
            onClick={() => {
              setCreatingSubfolder(folder.id);
              setFolderMenu(null);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Create subfolder
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
          <button
            onClick={() => handleDeleteFolder(folder.id)}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
