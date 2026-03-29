import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { logout as logoutService } from "../../../../services/authService";
import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "../../../../services/folderService";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../../../context/ThemeContext";

import SidebarHeader from "./components/SidebarHeader";
import SidebarFilters from "./components/SidebarFilters";
import ProfileSection from "./components/ProfileSection";
import CreateFolderInput from "./components/CreateFolderInput";
import FolderList from "./components/FolderList";
import FolderItem from "./components/FolderItem";
import { useFolders } from "./hooks/useFolders";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

export default function Sidebar({
  folders,
  activeFilter,
  onFilterChange,
  onFoldersChange,
  onFolderSelect,
  onShowProfile,
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
  const [editingFolder, setEditingFolder] = useState(null);
  const [editName, setEditName] = useState("");
  const [creatingSubfolder, setCreatingSubfolder] = useState(null); // folder.id del padre
  const [subfolderName, setSubfolderName] = useState("");

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (e) {}
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!folderMenu) return;

    function handleClickOutside(e) {
      if (!e.target.closest("[data-folder-menu]")) {
        setFolderMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [folderMenu]);

  const {
    handleCreateFolder,
    requestDelete,
    confirmDelete,
    cancelDelete,
    pendingDeleteId,
    handleUpdateFolder,
    handleCreateSubfolder,
  } = useFolders(onFoldersChange);

  const pendingFolder = folders
    .flatMap((f) => [f, ...(f.folders || [])])
    .find((f) => f.id === pendingDeleteId);

  const filters = [
    {
      key: "all",
      label: "All",
      count: counts.all,
      icon: <ArchiveBoxIcon className="w-5 h-5" />,
    },
    {
      key: "tagged",
      label: "Tagged",
      count: counts.tagged,
      icon: <BookmarkIcon className="w-5 h-5" />,
    },
    {
      key: "untagged",
      label: "Untagged",
      count: counts.untagged,
      icon: <BookmarkSlashIcon className="w-5 h-5" />,
    },
  ];
  return (
    <aside className="w-64 h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 fixed left-0 top-0">
      {/* Logo */}
      <SidebarHeader isDark={isDark} toggleTheme={toggleTheme} />

      {/* Filters */}
      <SidebarFilters
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      {/* New Folder */}
      <CreateFolderInput
        showInput={showInput}
        setShowInput={setShowInput}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        onCreate={(e) =>
          handleCreateFolder(e, newFolderName, setNewFolderName, setShowInput)
        }
      />

      {/* Folders */}
      <FolderList folders={folders}>
        {(folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
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
            handleDeleteFolder={requestDelete}
            handleCreateSubfolder={handleCreateSubfolder}
          />
        )}
      </FolderList>

      {/* Profile + Logout */}
      <ProfileSection
        user={user}
        onLogout={handleLogout}
        onShowProfile={onShowProfile}
      />

      {pendingDeleteId && (
        <ConfirmDeleteModal
          type="folder"
          name={pendingFolder?.name}
          onConfirm={confirmDelete}
          onClose={cancelDelete}
        />
      )}
    </aside>
  );
}
