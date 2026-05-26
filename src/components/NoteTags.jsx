import React from "react";

function NoteTags({ activeNote, newTag, setNewTag, handleAddTag }) {
  return (
    <div className="px-8 pb-4 flex flex-wrap items-center gap-2 shrink-0">
      {activeNote.tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
        >
          {tag}
          <button
            onClick={() => handleRemoveTag(tag)}
            className="text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder="Add tag…"
        className="text-xs text-gray-500 placeholder-gray-300 outline-none w-20"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={(e) => handleAddTag(e)}
      />
    </div>
  );
}

export default NoteTags;
