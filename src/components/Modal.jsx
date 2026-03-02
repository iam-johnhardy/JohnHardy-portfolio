import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

// A very simple modal component. When mounted it renders its children
// in a fixed, full-screen overlay. The caller controls visibility and
// is responsible for unmounting the component (e.g. via `isOpen && <Modal>`).
//
// Props:
//   onClose: function to call when user clicks background or close icon
//   children: content of the modal
export const Modal = ({ onClose, children }) => {
  const handleBackgroundClick = (e) => {
    // only close when clicking on backdrop, not when clicking inside content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-gray-800 rounded-lg max-w-3xl w-full mx-4 p-6 overflow-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>
  );

  // If your project doesn't already render a div#modal-root in index.html
  // you can just return modalContent directly. Using a portal keeps the
  // markup out of the normal stacking context, which can help with z-index
  // issues when the modal is rendered deep inside other elements.
  const portalRoot = document.getElementById("modal-root");
  return portalRoot ? createPortal(modalContent, portalRoot) : modalContent;
};
