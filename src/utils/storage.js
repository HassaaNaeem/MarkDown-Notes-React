const KEY = "md-notes";

export function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch (error) {
    return [];
  }
}

export function saveNotes(notes) {
  localStorage.setItem(KEY, JSON.stringify(notes));
}
