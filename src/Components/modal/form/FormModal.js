import React from "react"; // 1. Import React to use forwardRef
import "./FormModal.css";

// 2. Wrap the entire component definition in React.forwardRef
// This adds `ref` as a second argument to your component.
const FormModal = React.forwardRef(({ children, onClose }, ref) => {
  // This confirmation logic is perfect, no changes needed here.
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleCloseAttempt}>
          ×
        </button>

        {/* 
          3. THIS IS THE KEY CHANGE:
          We create a dedicated scrollable container DIV right here.
          We attach the forwarded `ref` to it.
        */}
        <div
          ref={ref}
          style={{
            height: "100%", // Takes up all the vertical space of its parent (.modal-content)
            overflowY: "scroll", // This makes THIS div scrollable, not the whole modal
          }}
        >
          {/* All the children (MultiStepForm, PdfPreviewer) go inside our scrollable div */}
          {children}
        </div>
      </div>
    </div>
  );
});

export default FormModal;
