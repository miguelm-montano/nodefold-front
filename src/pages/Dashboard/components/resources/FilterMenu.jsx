import { useEffect, useRef, useState } from "react";
import {
  AdjustmentsVerticalIcon,
  PhotoIcon,
  SwatchIcon,
  SparklesIcon,
  LanguageIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const RESOURCE_TYPES = [
  { value: "image", label: "Image", icon: <PhotoIcon className="w-4 h-4" /> },
  { value: "font", label: "Font", icon: <LanguageIcon className="w-4 h-4" /> },
  {
    value: "color_palette",
    label: "Color Palette",
    icon: <SwatchIcon className="w-4 h-4" />,
  },
  { value: "icon", label: "Icon", icon: <SparklesIcon className="w-4 h-4" /> },
  { value: "web", label: "Web", icon: <GlobeAltIcon className="w-4 h-4" /> },
];

export default function FilterMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`p-1.5 rounded-lg transition-colors ${
          open
            ? "text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            : "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <AdjustmentsVerticalIcon className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg z-50 py-1.5 overflow-hidden">
          <p className="px-3 pt-1 pb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Filter by type
          </p>

          {RESOURCE_TYPES.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setActive(active === value ? null : value)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                active === value
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
