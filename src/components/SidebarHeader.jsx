import React from "react";
import useNotes from "../hooks/useNotes";

function SidebarHeader() {
  const { openModal, defaultTab } = useNotes();
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
      <span className="text-sm font-semibold" onClick={defaultTab}>
        Notes
      </span>
      <button
        onClick={openModal}
        className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
      >
        + New
      </button>
    </div>
  );
}

export default SidebarHeader;
