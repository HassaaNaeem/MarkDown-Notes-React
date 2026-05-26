import React from "react";
import SidebarHeader from "./SidebarHeader";
import Search from "./Search";
import NotesList from "./NotesList";
import { useDraggable } from "@dnd-kit/react";
import useNotes from "../hooks/useNotes";

function Sidebar() {
  const { handleSelectTag, activeTag, filteredNotes, notes } = useNotes();

  const allTags = [
    ...new Set(notes.map((note) => note.tags.map((tag) => tag)).flat()),
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-gray-100">
      {/* Sidebar header */}
      <SidebarHeader />
      {/* Search input */}
      <Search />

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
      <NotesList />
    </aside>
  );
}

export default Sidebar;
