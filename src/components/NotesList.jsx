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
import useNotes from "../hooks/useNotes";

function NotesList() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const { renderNotes, filteredNotes } = useNotes();

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = filteredNotes.findIndex((n) => n.id === active.id);
    const newIndex = filteredNotes.findIndex((n) => n.id === over.id);
    renderNotes(filteredNotes, oldIndex, newIndex);
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
                <Note note={note} />
              </>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default NotesList;
