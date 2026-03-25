import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { logout as logoutService } from "../../../services/authService";
import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "../../../services/folderService";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../../context/ThemeContext";

export default function Sidebar({
  folders,
  activeFilter,
  onFilterChange,
  onFoldersChange,
  onFolderSelect,
  activeFolderId,
  counts,
}) {
  const [showInput, setShowInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [creating, setCreating] = useState(false);
  const [folderMenu, setFolderMenu] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (e) {}
    logout();
    navigate("/");
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setCreating(true);
    try {
      await createFolder({ name: newFolderName });
      setNewFolderName("");
      setShowInput(false);
      onFoldersChange();
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteFolder = async (id) => {
    if (!confirm("Delete this folder and all its contents?")) return;
    await deleteFolder(id);
    setFolderMenu(null);
    onFoldersChange();
  };

  const filters = [
    {
      key: "all",
      label: "All",
      count: counts.all,
      icon: <ArchiveBoxIcon className="w-4 h-4" />,
    },
    {
      key: "tagged",
      label: "Tagged",
      count: counts.tagged,
      icon: <BookmarkIcon className="w-4 h-4" />,
    },
    {
      key: "untagged",
      label: "Untagged",
      count: counts.untagged,
      icon: <BookmarkSlashIcon className="w-4 h-4" />,
    },
  ];
  return (
    <aside className="w-64 h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 fixed left-0 top-0">
      {/* Logo */}
      <div className="px-6 py-5 dark:border-gray-800 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Nodefold
        </span>
        <button
          onClick={toggleTheme}
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors -mr-1"
        >
          {isDark ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Filtros */}
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

      {/* New Folder */}
      <div className="px-3 mb-3 mt-4">
        <button
          onClick={() => setShowInput(!showInput)}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          + New folder
        </button>
        {showInput && (
          <form onSubmit={handleCreateFolder} className="mt-2 px-1">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </form>
        )}
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 mt-4">
        {folders.map((folder) => (
          <div key={folder.id} className="relative group">
            <button
              onClick={() => onFolderSelect(folder.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                activeFolderId === folder.id
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <span className="truncate">📁 {folder.name}</span>

              {/* Contador / menu */}
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

            {/* Mini menu */}
            {folderMenu === folder.id && (
              <div className="absolute right-0 top-8 z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 w-32">
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Profile + Logout */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-4 space-y-1">
        <Link
          to="/profile"
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2"
        >
          👤 {user?.name}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
