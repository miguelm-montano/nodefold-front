export default function FolderList({ folders, children }) {
  return (
    <div className="flex-1 overflow-y-auto px-3 space-y-1 mt-4">
      {folders.map((folder) => (
        <div key={folder.id}>{children(folder)}</div>
      ))}
    </div>
  );
}
