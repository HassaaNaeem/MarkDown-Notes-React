import { useState } from "react";

import ReactMarkdown from "react-markdown";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
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

  function updateNote(id, changes) {}

  function handleDeleteNote(id) {}

  function handleAddTag(e) {
    if (e.key !== "Enter") return;

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

    const updatedNotes = notes.filter((note) => {
      if (note.id == activeNoteId) {
        note.tags = updatedTags;
      }
      return note;
    });
    setNotes(updatedNotes);
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
        setIsModalOpen={setIsModalOpen}
      />

      {/* ── MAIN AREA ─────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeNote ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 shrink-0">
              {/* Mode toggle */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                {["edit", "split", "preview"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
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

            {/* Title input */}
            <div className="px-8 pt-6 pb-2 shrink-0">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) =>
                  updateNote(activeNote.id, { title: e.target.value })
                }
                placeholder="Note title"
                className="w-full text-2xl font-semibold placeholder-gray-300 outline-none"
              />
            </div>

            {/* Tags row */}
            <div className="px-8 pb-4 flex flex-wrap items-center gap-2 shrink-0">
              {activeNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tag…"
                className="text-xs text-gray-500 placeholder-gray-300 outline-none w-20"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => handleAddTag(e)}
              />
            </div>

            {/* Editor + Preview panes */}
            <div className="flex-1 flex overflow-hidden border-t border-gray-100">
              {/* Edit pane — show when mode is "edit" or "split" */}
              {(mode === "edit" || mode === "split") && (
                <textarea
                  value={activeNote.body}
                  onChange={(e) =>
                    updateNote(activeNote.id, { body: e.target.value })
                  }
                  placeholder="Write in markdown…"
                  className={`flex-1 resize-none outline-none px-8 py-5 text-sm font-mono leading-relaxed placeholder-gray-300 ${
                    mode === "split" ? "border-r border-gray-100" : ""
                  }`}
                />
              )}

              {/* Preview pane — show when mode is "preview" or "split" */}
              {(mode === "preview" || mode === "split") && (
                <div className="flex-1 overflow-y-auto px-8 py-5 prose prose-sm prose-gray max-w-none">
                  <ReactMarkdown>
                    {activeNote.body || "Preview will appear here…"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty state — no note selected */
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-gray-700 mb-1">
              No note selected
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Pick a note or create a new one
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              New note
            </button>
          </div>
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNotes={setNotes}
        setActiveNoteId={setActiveNoteId}
      />
    </div>
  );
}

export default AppLayout;
