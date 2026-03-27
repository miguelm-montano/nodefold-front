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
import { deleteResource } from "../../../services/resourceService";

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

function ResourcePreview({ resource }) {
  if (resource.type === "image") {
    return (
      <img
        src={
          resource.image_path
            ? `http://localhost:8000/storage/${resource.image_path}`
            : resource.url
        }
        alt={resource.title}
        className="w-full rounded-xl object-cover max-h-60"
      />
    );
  }

  if (resource.type === "color_palette") {
    return (
      <div className="flex rounded-xl overflow-hidden h-60">
        {(resource.color_data || []).map((hex, i) => (
          <div
            key={i}
            style={{ backgroundColor: `#${hex}` }}
            className="flex-1"
          />
        ))}
      </div>
    );
  }

  if (resource.type === "font") {
    const match = resource.url?.match(/family=([^:&]+)/);
    const fontName = match
      ? decodeURIComponent(match[1].replace(/\+/g, " "))
      : resource.title;

    return (
      <div className="border border-gray-100 dark:border-gray-800 dark:bg-gray-900 rounded-xl p-5 text-center">
        <p
          style={{ fontFamily: `'${fontName}', serif` }}
          className="text-3xl font-medium text-gray-900 dark:text-white mb-1"
        >
          {fontName}
        </p>
        <p
          style={{ fontFamily: `'${fontName}', serif` }}
          className="text-sm font-light text-gray-400 dark:text-gray-500"
        >
          This is how this typography looks
        </p>
      </div>
    );
  }

  if (resource.type === "web") {
    let domain = resource.url;
    try {
      domain = new URL(
        resource.url.startsWith("http")
          ? resource.url
          : `https://${resource.url}`,
      ).hostname.replace("www.", "");
    } catch (e) {}
    return (
      <div className="border border-gray-100 dark:border-gray-800 dark:bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-center">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          className="w-10 h-10"
          alt={domain}
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">{domain}</p>
      </div>
    );
  }

  if (resource.type === "icon") {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center">
        <img
          src={resource.url}
          alt={resource.title}
          className="w-16 h-16 dark:invert"
        />
      </div>
    );
  }

  return null;
}

export default function ResourcePanel({ resource, onClose, onDelete, onEdit }) {
  if (!resource) return null;

  const handleDelete = async () => {
    if (!confirm("Delete this resource?")) return;
    await deleteResource(resource.id);
    onDelete();
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

        {/* Título */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Title
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {resource.title}
          </p>
        </div>

        {/* Descripción */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Description
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {resource.description || "No description available"}
          </p>
        </div>

        {/* URL */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            URL
          </p>
          {resource.url ? (
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
          {resource.tags?.length > 0 ? (
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
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(resource)}
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
      </div>
    </aside>
  );
}
