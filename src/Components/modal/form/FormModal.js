import React from "react";
import "./FormModal.css"; // We will create this CSS file next

const FormModal = ({ children, onClose }) => {
  return (
    // The full-screen dark overlay. Clicking it will close the modal.
    <div className="modal-backdrop" onClick={onClose}>
      {/* The white content box. Clicking inside it will NOT close the modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* The 'X' button to close the pop-up */}
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        {/* This is where the content (like your MultiStepForm) will be rendered */}
        {children}
      </div>
    </div>
  );
};

export default FormModal;
