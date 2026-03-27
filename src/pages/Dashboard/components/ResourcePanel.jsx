import { useState, useEffect } from "react";
import {
  PhotoIcon,
  LanguageIcon,
  SwatchIcon,
  SparklesIcon,
  FolderIcon,
  GlobeAltIcon,
  XMarkIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { deleteResource, updateResource } from "../../../services/resourceService";
import ResourcePreview from "./resources/ResourcePreview";

const TYPE_ICONS = {
  image: <PhotoIcon className="w-3.5 h-3.5" />,
  font: <LanguageIcon className="w-3.5 h-3.5" />,
  color_palette: <SwatchIcon className="w-3.5 h-3.5" />,
  icon: <SparklesIcon className="w-3.5 h-3.5" />,
  web: <GlobeAltIcon className="w-3.5 h-3.5" />,
};

const TYPE_LABELS = {
  image: "Image",
  font: "Font",
  color_palette: "Color Palette",
  icon: "Icon",
  web: "Web",
};

const inputClass =
  "w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400";

export default function ResourcePanel({ resource, onClose, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    setIsEditing(false);
    setSaveError(null);
  }, [resource?.id]);

  if (!resource) return null;

  const handleDelete = async () => {
    if (!confirm("Delete this resource?")) return;
    await deleteResource(resource.id);
    onDelete();
  };

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

  return (
    <aside className="w-80 h-screen flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 fixed right-0 top-0 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-end px-5 pt-5 pb-2">
        <button
          onClick={onClose}
          className="cursor-pointer text-black hover:text-gray-900 dark:invert transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 pb-6 space-y-5 mt-12">
        {/* Preview */}
        <ResourcePreview resource={resource} />

        {/* Save error */}
        {saveError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {saveError}
          </div>
        )}

        {/* Título */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Title
          </p>
          {isEditing ? (
            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              className={inputClass}
            />
          ) : (
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {resource.title}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Description
          </p>
          {isEditing ? (
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              rows={3}
              placeholder="Description (optional)"
              className={`${inputClass} resize-none`}
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {resource.description || "No description available"}
            </p>
          )}
        </div>

        {/* URL */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            URL
          </p>
          {isEditing ? (
            <input
              value={editForm.url}
              onChange={(e) =>
                setEditForm({ ...editForm, url: e.target.value })
              }
              placeholder="Paste URL"
              className={inputClass}
            />
          ) : resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-500 hover:underline truncate block"
            >
              {resource.url}
            </a>
          ) : (
            <p className="text-sm text-gray-400">No URL available</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            Tags
          </p>
          {isEditing ? (
            <input
              value={editForm.tags}
              onChange={(e) =>
                setEditForm({ ...editForm, tags: e.target.value })
              }
              placeholder="modern, free, minimalist"
              className={inputClass}
            />
          ) : resource.tags?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No tags</p>
          )}
        </div>

        {/* Type + Folder */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            {TYPE_ICONS[resource.type]}
            {TYPE_LABELS[resource.type] ?? resource.type}
          </div>
          {resource.folder && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <FolderIcon className="w-3.5 h-3.5" />
              {resource.folder.name}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800" />

        {/* Actions */}
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-4xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-4xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={startEdit}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-4xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-4xl border border-red-200 dark:border-red-800 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
