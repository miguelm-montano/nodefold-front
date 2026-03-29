import { useState } from "react";
import {
  PhotoIcon,
  LanguageIcon,
  SwatchIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const TYPES = [
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

export default function TypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = TYPES.find((t) => t.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        {selected ? (
          <span className="flex items-center gap-2">
            {selected.icon}
            {selected.label}
          </span>
        ) : (
          <span className="text-gray-400">Select type</span>
        )}
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 overflow-hidden">
          {TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                onChange(type.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                value === type.value
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
