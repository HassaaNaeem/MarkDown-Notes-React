import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

function Note({ note, setActiveNoteId, activeNoteId, isActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
    opacity: isDragging ? 0.85 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setActiveNoteId(note.id)}
      className={`
        px-3 flex py-2.5 rounded-xl
        cursor-grab active:cursor-grabbing
        transition-all duration-200 ease-out
        select-none
        border border-transparent
        ${activeNoteId === note.id ? "bg-gray-100" : "hover:bg-gray-50"}
        ${isDragging ? "scale-[1.02] shadow-2xl bg-white border-gray-200" : ""}
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
