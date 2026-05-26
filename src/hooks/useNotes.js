import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

function useNotes() {
  const context = useContext(NotesContext);

  if (context == undefined)
    throw new Error("QuizContext is being used outside the QuizProvider");

  return context;
}

export default useNotes;
