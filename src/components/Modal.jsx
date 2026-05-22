// NewNoteModal.jsx
// Drop this into src/ and import it in App.jsx
//
// Usage in App.jsx:
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   <NewNoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//   Change the "+ New" button to: onClick={() => setIsModalOpen(true)}

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: replace this with React Hook Form's handleSubmit
    // 1. useForm() at the top of this component
    // 2. register() each input
    // 3. handleSubmit(onSubmit) on the <form>
    // 4. In onSubmit: call addNote() from props or context, then onClose()
  }

  function handleOverlayClick(e) {
    // TODO: only close if the click was on the overlay itself, not the modal box
    // Hint: check if e.target === e.currentTarget
    onClose();
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
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Note title…"
              autoFocus
              // TODO: {...register("title", { required: true })}
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 placeholder-gray-300 transition-colors"
            />
            {/* TODO: show error message here */}
            {/* {errors.title && <p className="text-xs text-red-400 mt-1">Title is required</p>} */}
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
              // TODO: {...register("tags")}
              // TODO: in onSubmit, split this string by comma:
              //   tags: data.tags.split(",").map(t => t.trim()).filter(Boolean)
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 placeholder-gray-300 transition-colors"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
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
