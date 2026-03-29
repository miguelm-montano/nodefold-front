import { useState, useEffect } from "react";
import { updateResource } from "../../../services/resourceService";

export function useResourceEdit(resource, onEdit) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setIsEditing(false);
    setSaveError(null);
  }, [resource?.id]);

  const startEdit = () => {
    setEditForm({
      title: resource.title,
      description: resource.description || "",
      tags: resource.tags?.map((t) => t.name).join(", ") || "",
      url: resource.url || "",
    });
    setIsEditing(true);
    setSaveError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!editForm.title.trim()) {
      setSaveError("Title is required.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      const res = await updateResource(resource.id, {
        title: editForm.title,
        type: resource.type,
        description: editForm.description || null,
        tags: editForm.tags || null,
        url: editForm.url || null,
      });
      setIsEditing(false);
      onEdit(res.data);
    } catch (err) {
      setSaveError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return { isEditing, editForm, setEditForm, saving, saveError, startEdit, handleCancel, handleSave };
}
