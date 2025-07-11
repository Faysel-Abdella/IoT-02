import React from "react";
import "./FormModal.css";

// The component receives the ref and forwards it
const FormModal = React.forwardRef(({ children, onClose }, ref) => {
  const handleCloseAttempt = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to exit? Any unsaved changes will be lost."
    );
    if (userConfirmed) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleCloseAttempt}>
      {/* 
        1. Attach the forwarded ref DIRECTLY to the modal-content div.
        This is now your single scrollable container.
      */}
      <div
        ref={ref}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={handleCloseAttempt}>
          ×
        </button>

        {/* 
          2. The unnecessary inner div has been removed.
          Your children are now direct descendants of the scrollable container.
        */}
        {children}
      </div>
    </div>
  );
});

export default FormModal;
