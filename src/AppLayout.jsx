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
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [mode, setMode] = useState("split"); // "edit" | "preview" | "split"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  let filteredNotes = notes; // <-- replace with your filter logic

  if (search.length > 0 || activeTag) {
    if (activeTag == "All") setActiveTag(null);
    filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase().trim()) &&
        note.tags.find((tag) => tag == activeTag || activeTag == null),
    );
  }

  function updateNote(id, changes) {
    if (mode != "edit") {
      toast.error("To edit, please select edit mode");
      return;
    }

    const note = notes.find((note) => note.id == id);

    if (changes.title) {
      setNotes((notes) => [
        { ...note, title: changes.title },
        ...notes.filter((note) => note.id != id),
      ]);
    }
    if (changes.body) {
      setNotes((notes) => [
        { ...note, body: changes.body },
        ...notes.filter((note) => note.id != id),
      ]);
    }
  }

  function handleDeleteNote(id) {
    setNotes((notes) => notes.filter((note) => note.id != id));
    setActiveNoteId(null);
    setActiveTag(null);
  }

  function handleAddTag(e) {
    if (e.key !== "Enter") return;
    const tagAlreadyExists = [
      ...new Set(notes.map((note) => note.tags.map((tag) => tag)).flat()),
    ].includes(newTag.trim().toLowerCase());

    if (tagAlreadyExists) {
      toast.error("This tag already exists on this note");
      return;
    }

    const tags = notes
      .find((note) => note.id == activeNoteId)
      .tags.push(newTag.trim().toLowerCase());

    const updatedNote = notes.filter((note) => note.id == activeNoteId)[0];

    setNotes((notes) => [
      updatedNote,
      ...notes.filter((note) => note.id != activeNoteId),
    ]);
    setNewTag("");
  }

  function handleRemoveTag(tag) {
    const updatedTags = notes
      .find((note) => note.id == activeNoteId)
      .tags.filter((t) => t != tag);
    console.log(updatedTags);

    if (updatedTags < 2) {
      toast.error("A note should contain at least 1 tag");
      return;
    }

    const updatedNotes = notes.filter((note) => {
      if (note.id == activeNoteId) {
        note.tags = updatedTags;
      }
      return note;
    });
    setNotes(updatedNotes);
    setActiveTag(null);
  }

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
      <Sidebar
        search={search}
        setSearch={setSearch}
        setActiveTag={setActiveTag}
        activeTag={activeTag}
        filteredNotes={filteredNotes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
        notes={notes}
        setNotes={setNotes}
        setIsModalOpen={setIsModalOpen}
      />

      {/* ── MAIN AREA ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeNote ? (
          <>
            {/* Toolbar */}
            <Toolbar
              mode={mode}
              setMode={setMode}
              handleDeleteNote={handleDeleteNote}
              activeNote={activeNote}
            />

            {/* Title input */}
            <NoteTitle activeNote={activeNote} updateNote={updateNote} />

            {/* Tags row */}
            <NoteTags
              activeNote={activeNote}
              newTag={newTag}
              setNewTag={setNewTag}
              handleAddTag={handleAddTag}
            />

            {/* Editor + Preview panes */}
            <Panes
              mode={mode}
              activeNote={activeNote}
              updateNote={updateNote}
            />
          </>
        ) : (
          /* Empty state — no note selected */
          <EmptyState setIsModalOpen={setIsModalOpen} />
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNotes={setNotes}
        setActiveNoteId={setActiveNoteId}
      />

      <ToasterUi />
    </div>
  );
}

export default AppLayout;
