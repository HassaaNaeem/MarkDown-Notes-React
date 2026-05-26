import { cloneElement, useState } from "react";

import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import toast, { Toaster } from "react-hot-toast";
import Toolbar from "./components/Toolbar";
import NoteTitle from "./components/NoteTitle";
import NoteTags from "./components/NoteTags";
import Panes from "./components/Panes";
import EmptyState from "./components/EmptyState";
import ToasterUi from "./ui/ToasterUi";
import useNotes from "./hooks/useNotes";
// ─── DUMMY DATA — replace this with state you build ───────────────────────
const DUMMY_NOTES = [
  {
    id: "1",
    title: "Getting Started",
    body: "## Hello\nStart writing in **markdown**",
    tags: ["react", "notes"],
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Shopping List",
    body: "- Milk\n- Eggs\n- Bread",
    tags: ["personal", "work"],
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Project Ideas",
    body: "1. Build a quiz app\n2. Build a dashboard",
    tags: ["work", "react"],
    updatedAt: "2024-01-13",
  },
];

function AppLayout() {
  const { notes, activeNote } = useNotes();

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
      <Sidebar />

      {/* ── MAIN AREA ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeNote ? (
          <>
            {/* Toolbar */}
            <Toolbar />

            {/* Title input */}
            <NoteTitle />

            {/* Tags row */}
            <NoteTags />

            {/* Editor + Preview panes */}
            <Panes />
          </>
        ) : (
          /* Empty state — no note selected */
          <EmptyState />
        )}
      </main>
      <Modal />

      <ToasterUi />
    </div>
  );
}

export default AppLayout;
