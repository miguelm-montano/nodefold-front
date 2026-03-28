import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "../../../../../services/folderService";

import { useState } from "react";

export function useFolders(onFoldersChange) {
  const [creating, setCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleCreateFolder = async (e, name, setName, setShowInput) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCreating(true);
    try {
      await createFolder({ name });
      setName("");
      setShowInput(false);
      onFoldersChange();
    } finally {
      setCreating(false);
    }
  };

  const requestDelete = (id) => setPendingDeleteId(id);
  const cancelDelete = () => setPendingDeleteId(null);

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteFolder(pendingDeleteId);
    setPendingDeleteId(null);
    onFoldersChange();
  };

  const handleUpdateFolder = async (id, name, resetEdit) => {
    if (!name.trim()) return;

    await updateFolder(id, { name });
    resetEdit();
    onFoldersChange();
  };

  const handleCreateSubfolder = async (e, parentId, name, resetSubfolder) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createFolder({ name, parent_id: parentId });
    resetSubfolder();
    onFoldersChange();
  };

  return {
    handleCreateFolder,
    requestDelete,
    confirmDelete,
    cancelDelete,
    pendingDeleteId,
    handleUpdateFolder,
    handleCreateSubfolder,
    creating,
  };
}
