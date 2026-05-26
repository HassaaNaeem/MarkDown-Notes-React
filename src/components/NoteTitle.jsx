import React from "react";
import useNotes from "../hooks/useNotes";

function NoteTitle() {
  const { activeNote, updateNote } = useNotes();
  return (
    <div className="px-8 pt-6 pb-2 shrink-0">
      <input
        type="text"
        value={activeNote.title}
        onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
        placeholder="Note title"
        className="w-full text-2xl font-semibold placeholder-gray-300 outline-none"
      />
    </div>
  );
}

export default NoteTitle;
