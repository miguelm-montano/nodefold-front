export default function ResourcePreview({ resource }) {
  if (resource.type === "image") {
    return (
      <img
        src={resource.image_url ?? resource.url}
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
