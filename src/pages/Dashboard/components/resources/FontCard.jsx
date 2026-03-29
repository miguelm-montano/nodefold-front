import { useEffect, useState } from "react";

export default function FontCard({ resource, onClick }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const fontName = extractFontName(resource.url);
  const fontFamily = fontName || "inherit";

  useEffect(() => {
    if (!fontName) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}:wght@400;700&display=swap`;
    link.onload = () => setFontLoaded(true);
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [fontName]);

  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer rounded-2xl mb-4 overflow-hidden border border-gray-100 dark:border-gray-800 bg-stone-50 dark:bg-gray-900 p-5 group transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Label */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">
        Font
      </p>

      {/* Aa grande */}
      <p
        style={{ fontFamily: `'${fontFamily}', serif` }}
        className="text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-none"
      >
        Aa
      </p>

      {/* Abecedario */}
      <p
        style={{ fontFamily: `'${fontFamily}', serif` }}
        className="text-sl text-gray-600 dark:text-gray-300 mb-1 tracking-wide"
      >
        ABCDEFGHIJKLM
      </p>
      <p
        style={{ fontFamily: `'${fontFamily}', serif` }}
        className="text-sl text-gray-600 dark:text-gray-300 mb-1 tracking-wide"
      >
        abcdefghijklm
      </p>

      {/* Numbers */}
      <p
        style={{ fontFamily: `'${fontFamily}', serif` }}
        className="text-sl text-gray-600 dark:text-gray-300 mb-4 tracking-wide"
      >
        0123456789
      </p>

      {/* Nombre */}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
        {fontName || resource.title}
      </p>
    </div>
  );
}

function extractFontName(url) {
  if (!url) return null;
  try {
    const match = url.match(/family=([^:&]+)/);
    if (match) {
      return decodeURIComponent(match[1].replace(/\+/g, " "));
    }
  } catch (e) {}
  return null;
}
