export default function WebCard({ resource, onClick }) {
  const domain = extractDomain(resource.url);
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer rounded-2xl mb-3 overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 group transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center"
    >
      {/* Icono */}
      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
        <img
          src={favicon}
          alt={resource.title}
          className="w-8 h-8"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Textos */}
      <div className="flex flex-col justify-center text-left">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {resource.title}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {domain}
        </p>
      </div>
    </div>
  );
}

function extractDomain(url) {
  if (!url) return "";
  try {
    const { hostname } = new URL(
      url.startsWith("http") ? url : `https://${url}`,
    );
    return hostname.replace("www.", "");
  } catch (e) {
    return url;
  }
}
