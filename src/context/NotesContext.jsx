import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { getNotes, saveNotes } from "../utils/storage";

const NotesContext = createContext();

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

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => getNotes());
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("split"); // "edit" | "preview" | "split"
  const [activeTag, setActiveTag] = useState(null);
  const [newTag, setNewTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  let filteredNotes = notes; // <-- replace with your filter logic
  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  saveNotes(filteredNotes);

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

    const activeNote = notes.find((note) => note.id == activeNoteId);

    const tagAlreadyExists = activeNote.tags.includes(
      newTag.trim().toLowerCase(),
    );

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
  function handleAddNote(data) {
    const newNote = {
      id: uuidv4(),
      ...data,
      tags: data?.tags?.split(",").map((tag) => tag.trim().toLowerCase()),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setNotes((notes) => [newNote, ...notes]);

    closeModal();
    setActiveNoteId(newNote.id);
  }

  function handleSelectTag(e) {
    console.log(e.target);
    setActiveTag(e.target.innerText);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function defaultTab() {
    setActiveNoteId(null);
  }

  function openNote(id) {
    setActiveNoteId(id);
  }

  function renderNotes(filteredNotes, oldIndex, newIndex) {
    arrayMove(filteredNotes, oldIndex, newIndex);
  }

  function handleSearch(value) {
    setSearch(value);
  }

  function handleNewTag(value) {
    setNewTag(value);
  }
  function handleMode(mode) {
    setMode(mode);
  }

  return (
    <NotesContext.Provider
      value={{
        updateNote,
        handleDeleteNote,
        handleAddTag,
        handleRemoveTag,
        handleSelectTag,
        handleAddNote,
        openModal,
        defaultTab,
        openNote,
        closeModal,
        handleMode,
        handleSearch,
        handleNewTag,
        notes,
        activeNoteId,
        activeTag,
        mode,
        newTag,
        search,
        activeNote,
        filteredNotes,
        isModalOpen,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export { NotesContext, NotesProvider };
