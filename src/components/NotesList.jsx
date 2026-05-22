import React from "react";

function NotesList({ filteredNotes, activeNoteId, setActiveNoteId }) {
  return (
    <>
      {/* TODO: replace hardcoded list items with filteredNotes.map() */}
      <ul className="flex-1 overflow-y-auto mt-2 px-2 pb-4 space-y-0.5">
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              activeNoteId === note.id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium truncate">
              {note.title || "Untitled"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{note.updatedAt}</p>
            {/* TODO: format updatedAt with date-fns: format(new Date(note.updatedAt), "MMM d, yyyy") */}
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NotesList;
