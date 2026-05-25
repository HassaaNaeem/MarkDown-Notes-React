import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

function Note({ note, setActiveNoteId, activeNoteId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: note.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease",
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setActiveNoteId(note.id)}
      className={`
        px-3 flex py-2.5 rounded-lg
        cursor-grab active:cursor-grabbing
        transition-colors
        select-none
        ${activeNoteId === note.id ? "bg-gray-100" : "hover:bg-gray-50"}
        ${isDragging ? "bg-white shadow-md" : ""}
      `}
    >
      <div className="w-full">
        <p className="text-sm font-medium truncate">
          {note.title || "Untitled"}
        </p>

        <p className="text-xs text-gray-400 mt-0.5">{note.updatedAt}</p>

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
      </div>
    </li>
  );
}

export default Note;
