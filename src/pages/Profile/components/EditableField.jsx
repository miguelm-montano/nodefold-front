import { useState, useRef, useEffect } from "react";

export default function EditableField({ label, value, type = "text", onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleDoubleClick = () => {
    setDraft(value);
    setEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave(draft);
      setEditing(false);
    }

    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-widest px-3">
        {label}
      </label>

      {editing ? (
        <input
          ref={inputRef}
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setDraft(value);
            setEditing(false);
          }}
          className="px-3 py-2 text-sm rounded-lg border border-gray-900 dark:border-white bg-transparent text-gray-900 dark:text-white focus:outline-none"
        />
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          title="Double click to edit"
          className="px-3 py-2 text-sm text-gray-900 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 cursor-text transition-colors"
        >
          {value || <span className="text-gray-400">—</span>}
        </p>
      )}
    </div>
  );
}
