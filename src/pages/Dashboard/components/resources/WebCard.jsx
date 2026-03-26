export default function WebCard({ resource, onClick }) {
  const domain = extractDomain(resource.url);
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer rounded-2xl mb-4 overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 group transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Favicon */}
      <div className="w-10 h-10 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <img
          src={favicon}
          alt={resource.title}
          className="w-6 h-6"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Título */}
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
        {resource.title}
      </p>

      {/* Dominio */}
      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
        {domain}
      </p>
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
