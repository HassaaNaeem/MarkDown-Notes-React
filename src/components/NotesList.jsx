import Note from "./Note";

import { useState } from "react";
import {
  PointerSensor,
  closestCenter,
  DndContext,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function NotesList({ filteredNotes, activeNoteId, setActiveNoteId, setNotes }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = filteredNotes.findIndex((n) => n.id === active.id);
    const newIndex = filteredNotes.findIndex((n) => n.id === over.id);
    setNotes(arrayMove(filteredNotes, oldIndex, newIndex));
    // TODO: if you have a reorderNotes() in useNotes hook, call that instead of setNotes
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredNotes.map((n) => n.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex-1 overflow-y-auto mt-2 px-2 pb-4 space-y-0.5">
            {filteredNotes.map((note) => (
              <>
                <Note
                  note={note}
                  setActiveNoteId={setActiveNoteId}
                  activeNoteId={activeNoteId}
                  isActive={note.id === activeNoteId}
                />
              </>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default NotesList;
