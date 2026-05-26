import React from "react";
import useNotes from "../hooks/useNotes";

function EmptyState() {
  const { openModal } = useNotes();
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <p className="text-sm font-medium text-gray-700 mb-1">No note selected</p>
      <p className="text-xs text-gray-400 mb-5">
        Pick a note or create a new one
      </p>
      <button
        onClick={openModal}
        className="text-xs px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        New note
      </button>
    </div>
  );
}

export default EmptyState;
