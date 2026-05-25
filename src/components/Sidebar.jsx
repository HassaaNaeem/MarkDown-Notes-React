import React from "react";
import SidebarHeader from "./SidebarHeader";
import Search from "./Search";
import NotesList from "./NotesList";
import { useDraggable } from "@dnd-kit/react";

function Sidebar({
  search,
  setSearch,
  setActiveTag,
  activeTag,
  filteredNotes,
  notes,
  setNotes,
  activeNoteId,
  setActiveNoteId,
  setIsModalOpen,
}) {
  const allTags = [
    ...new Set(notes.map((note) => note.tags.map((tag) => tag)).flat()),
  ];

  function handleSelectTag(e) {
    console.log(e.target);
    setActiveTag(e.target.innerText);
  }
  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-gray-100">
      {/* Sidebar header */}
      <SidebarHeader
        setIsModalOpen={setIsModalOpen}
        setActiveNoteId={setActiveNoteId}
      />
      {/* Search input */}
      <Search search={search} setSearch={setSearch} />

      {/* Tag filter pills */}
      {/* TODO: render allTags here as clickable pill buttons */}
      {/* Clicking a tag sets activeTag; clicking the active tag clears it (null) */}
      {/* Active tag pill should have a dark background */}
      <div className="px-3 pt-3 flex flex-wrap gap-1.5">
        <button
          onClick={handleSelectTag}
          className={`text-xs px-2 py-0.5 rounded-full border ${!activeTag ? "bg-gray-900 text-white border-gray-900" : " text-gray-500 border-gray-200 hover:border-gray-400"} `}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={handleSelectTag}
            className={`text-xs px-2 py-0.5 rounded-full border ${activeTag == tag ? "bg-gray-900 text-white border-gray-900" : " text-gray-500 border-gray-200 hover:border-gray-400"} `}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Notes list */}
      <NotesList
        setNotes={setNotes}
        filteredNotes={filteredNotes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
      />
    </aside>
  );
}

export default Sidebar;
