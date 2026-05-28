import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";

import useNotes from "../hooks/useNotes";

export default function Modal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isModalOpen, closeModal, handleAddNote } = useNotes();

  if (!isModalOpen) return null;

  function handleOverlayClick(e) {
    if (e.target == e.currentTarget) closeModal();
  }

  return (
    // Overlay
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      {/* Modal box */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-900">New note</h2>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((data) => {
            handleAddNote(data);
            reset();
          })}
          className="space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Note title…"
              autoFocus
              {...register("title", { required: true })}
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 placeholder-gray-300 transition-colors"
            />
            {/* TODO: show error message here */}
            {/* {errors.title && <p className="text-xs text-red-400 mt-1">Title is required</p>} */}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Body</label>
            <textarea
              rows={5}
              placeholder={
                "## Heading\n\nStart writing…\n\n- list item\n- list item"
              }
              {...register("body", { required: true })}
              className="w-full text-sm font-mono px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 placeholder-gray-300 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Tags
              <span className="ml-1.5 text-gray-400 font-normal">
                (comma separated)
              </span>
            </label>
            <input
              type="text"
              placeholder="react, notes, work…"
              {...register("tags", { required: true })}
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 placeholder-gray-300 transition-colors"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              Create note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
