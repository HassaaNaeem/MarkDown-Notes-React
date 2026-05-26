import React from "react";
import useNotes from "../hooks/useNotes";

function Toolbar() {
  const { mode, handleDeleteNote, activeNote, handleMode } = useNotes();

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 shrink-0">
      {/* Mode toggle */}
      <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
        {["edit", "split", "preview"].map((m) => (
          <button
            key={m}
            onClick={() => handleMode(m)}
            className={`text-xs px-3 py-1 rounded-md capitalize transition-colors ${
              mode === m
                ? "bg-white text-gray-900 shadow-sm border border-gray-100 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Delete button */}
      <button
        onClick={() => handleDeleteNote(activeNote.id)}
        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
      >
        Delete
      </button>
      {/* TODO: add a delete confirmation step before actually deleting */}
    </div>
  );
}

export default Toolbar;
