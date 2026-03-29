export default function IconCard({ resource, onClick }) {
  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer rounded-2xl mb-4 overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 group transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Icono */}
      <div className="flex items-center justify-center h-20 mb-4">
        <img
          src={resource.url}
          alt={resource.title}
          className="w-14 h-14 dark:invert"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Nombre */}
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center truncate">
        {resource.title}
      </p>
    </div>
  );
}
