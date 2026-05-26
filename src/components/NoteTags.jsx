import React from "react";
import Tag from "./Tag";

function NoteTags({
  activeNote,
  newTag,
  setNewTag,
  handleAddTag,
  handleRemoveTag,
}) {
  return (
    <div className="px-8 pb-4 flex flex-wrap items-center gap-2 shrink-0">
      {activeNote.tags.map((tag) => (
        <Tag tag={tag} handleRemoveTag={handleRemoveTag} />
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
