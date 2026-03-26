export default function ImageCard({ resource, onClick }) {
  return (
    <div
      onClick={() => onClick(resource)}
      className="cursor-pointer overflow-hidden rounded-2xl mb-4 group"
    >
      <img
        src={resource.image_path ? `http://localhost:8000/storage/${resource.image_path}` : resource.url}
        alt={resource.title}
        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
