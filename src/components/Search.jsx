import React from "react";
import useNotes from "../hooks/useNotes";

function Search() {
  const { search, handleSearch } = useNotes();

  return (
    <div className="px-3 pt-3">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search…"
        className="w-full text-xs px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 outline-none placeholder-gray-400"
      />
    </div>
  );
}

export default Search;
