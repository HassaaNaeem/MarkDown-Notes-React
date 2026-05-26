import React from "react";

function Tag({ tag, handleRemoveTag }) {
  return (
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
  );
}

export default Tag;
