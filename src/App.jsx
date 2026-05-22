import { useState } from "react";

import ReactMarkdown from "react-markdown";
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

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [mode, setMode] = useState("split"); // "edit" | "preview" | "split"

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  let filteredNotes = notes; // <-- replace with your filter logic
  console.log(notes);
  if (search.length > 0 || activeTag) {
    if (activeTag == "All") setActiveTag(null);
    filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) &&
        note.tags.find((tag) => tag == activeTag),
    );
  }
  // if (activeTag) {
  //   filteredNotes = notes.filter((note) =>
  //     note.tags.find((tag) => tag == activeTag),
  //   );
  //   console.log(filteredNotes);
  // }

  function handleSelectTag(e) {
    console.log(e.target);
    setActiveTag(e.target.innerText);
  }

  function handleAddNote() {}

  function updateNote(id, changes) {}

  function handleDeleteNote(id) {}

  function handleAddTag(e, tagInput, setTagInput) {
    if (e.key !== "Enter") return;
    // your logic here
  }

  function handleRemoveTag(tag) {}

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
      <aside className="w-64 shrink-0 flex flex-col border-r border-gray-100">
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <span className="text-sm font-semibold">Notes</span>
          <button
            onClick={handleAddNote}
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            + New
          </button>
        </div>

        {/* Search input */}
        <div className="px-3 pt-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full text-xs px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 outline-none placeholder-gray-400"
          />
        </div>

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
          <button
            onClick={handleSelectTag}
            className={`text-xs px-2 py-0.5 rounded-full border ${activeTag == "react" ? "bg-gray-900 text-white border-gray-900" : " text-gray-500 border-gray-200 hover:border-gray-400"} `}
          >
            react
          </button>
          <button
            onClick={handleSelectTag}
            className={`text-xs px-2 py-0.5 rounded-full border ${activeTag == "personal" ? "bg-gray-900 text-white border-gray-900" : " text-gray-500 border-gray-200 hover:border-gray-400"} `}
          >
            personal
          </button>
          <button
            onClick={handleSelectTag}
            className={`text-xs px-2 py-0.5 rounded-full border ${activeTag == "work" ? "bg-gray-900 text-white border-gray-900" : " text-gray-500 border-gray-200 hover:border-gray-400"} `}
          >
            work
          </button>
        </div>

        {/* Notes list */}
        {/* TODO: replace hardcoded list items with filteredNotes.map() */}
        <ul className="flex-1 overflow-y-auto mt-2 px-2 pb-4 space-y-0.5">
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                activeNoteId === note.id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <p className="text-sm font-medium truncate">
                {note.title || "Untitled"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{note.updatedAt}</p>
              {/* TODO: format updatedAt with date-fns: format(new Date(note.updatedAt), "MMM d, yyyy") */}
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
            </li>
          ))}
        </ul>
      </aside>

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
              {/* TODO: add a small input here for typing a new tag */}
              {/* On Enter key → call handleAddTag */}
              {/* Clear the input after adding */}
              <input
                type="text"
                placeholder="Add tag…"
                className="text-xs text-gray-500 placeholder-gray-300 outline-none w-20"
                onKeyDown={(e) => {
                  // TODO: call handleAddTag(e, tagInput, setTagInput)
                  // You'll need a local tagInput state for this input
                }}
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
                  {/* TODO: render activeNote.body through <ReactMarkdown> */}
                  {/* Install: npm install react-markdown */}
                  {/* Then: import ReactMarkdown from "react-markdown" */}
                  {/* Then: <ReactMarkdown>{activeNote.body}</ReactMarkdown> */}
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
              onClick={handleAddNote}
              className="text-xs px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              New note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
