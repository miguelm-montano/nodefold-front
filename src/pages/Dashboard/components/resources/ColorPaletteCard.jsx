export default function ColorPaletteCard({ resource, onClick }) {
  const colors = resource.color_data || [];

  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer rounded-2xl mb-4 overflow-hidden border border-gray-100 dark:border-gray-800 group transition-transform duration-300 hover:scale-[1.02]"
    >
      {/* Colores */}
      <div className="flex h-60">
        {colors.map((hex, i) => (
          <div
            key={i}
            style={{ backgroundColor: `#${hex}` }}
            className="flex-1"
          />
        ))}
      </div>

      {/* Códigos HEX */}
      <div className="flex bg-white dark:bg-gray-900">
        {colors.map((hex, i) => (
          <div key={i} className="flex-1 py-2 text-center">
            <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
