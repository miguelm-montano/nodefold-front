import { useState } from "react";
import { XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { createResource } from "../../../services/resourceService";
import FoldersSvg from "../../../assets/Folders.svg";

import TypeSelect from "./TypeSelect";
import FolderSelect from "./FolderSelect";

const RESOURCE_TYPES = [
  { value: "image", label: "Image" },
  { value: "font", label: "Font" },
  { value: "color_palette", label: "Color Palette" },
  { value: "icon", label: "Icon" },
  { value: "web", label: "Web" },
];

export default function AddResourceModal({
  folders,
  activeFolderId,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    type: "",
    folder_id: activeFolderId || "",
    url: "",
    title: "",
    description: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setImage(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append("type", form.type);
      data.append("title", form.title);
      if (form.description) data.append("description", form.description);
      if (form.tags) data.append("tags", form.tags);
      if (form.url) data.append("url", form.url);
      if (image) data.append("image", image);

      await createResource(form.folder_id, data);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // All folders for the selector
  const allFolders = folders.flatMap((f) => [
    { id: f.id, name: f.name },
    ...(f.folders || []).map((sub) => ({
      id: sub.id,
      name: `${f.name} / ${sub.name}`,
    })),
  ]);

  const showImageUpload = form.type === "image";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-4">
            <img
              src={FoldersSvg}
              alt="Folders"
              className="w-20 h-20 dark:invert"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Add Resource
              </h2>
              <p className="text-sm text-gray-400">
                Select, describe and upload
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Type + Folder */}
          <div className="grid grid-cols-2 gap-3">
            <TypeSelect
              value={form.type}
              onChange={(val) => setForm({ ...form, type: val })}
            />
            <FolderSelect
              folders={folders}
              value={form.folder_id}
              onChange={(val) => setForm({ ...form, folder_id: val })}
            />
          </div>

          {/* Drag & Drop — solo para image */}
          {showImageUpload && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById("fileInput").click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? "border-gray-400 bg-gray-50 dark:bg-gray-800"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <PaperClipIcon className="w-8 h-8 mx-auto text-gray-900 mb-2" />
              {image ? (
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {image.name}
                </p>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Drop file here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Or click to browse
                  </p>
                  <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">
                    Images: jpg, jpeg, png, webp, gif (max 10MB)
                  </p>
                </>
              )}
            </div>
          )}

          {/* URL */}
          <input
            type="text"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="Paste URL"
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows={2}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          />

          {/* Tags */}
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="modern, free, minimalist"
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-4xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-4xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
