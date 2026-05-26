import React from "react";

import ReactMarkdown from "react-markdown";
import useNotes from "../hooks/useNotes";

function Panes() {
  const { mode, activeNote, updateNote } = useNotes();
  return (
    <div className="flex-1 flex overflow-hidden border-t border-gray-100">
      {/* Edit pane — show when mode is "edit" or "split" */}
      {(mode === "edit" || mode === "split") && (
        <textarea
          value={activeNote.body}
          onChange={(e) => updateNote(activeNote.id, { body: e.target.value })}
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
  );
}

export default Panes;
