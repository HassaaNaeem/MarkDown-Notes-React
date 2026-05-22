import React from "react";

function SidebarHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
      <span className="text-sm font-semibold">Notes</span>
      <button
        //   onClick={}
        className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
      >
        + New
      </button>
    </div>
  );
}

export default SidebarHeader;
