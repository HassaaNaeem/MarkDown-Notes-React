import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

function useNotes() {
  const context = useContext(NotesContext);

  if (context == undefined) {
    throw new Error("NotesContext is being used outside the NotesProvider");
  }

  return context;
}

export default useNotes;
