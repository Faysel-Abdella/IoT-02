import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument"; // Make sure this path is correct

const PdfPreview = ({ formData }) => {
  console.log("PDF Preview is re-rendering!"); // This will help you see the fix work

  return (
    <div className="pdf-preview-section">
      <h3>Live PDF Preview:</h3>
      <PDFViewer style={{ width: "100%", height: "800px" }}>
        <PdfDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

// This is the magic line!
// React.memo tells this component NOT to re-render if its props (formData) are the same.
// NOTE: This relies on a shallow comparison of the formData object.
// Since you create a new object every time in setFormData, we need a custom comparison.
function areEqual(prevProps, nextProps) {
  // Only re-render if the stringified formData is different.
  // This is a simple but effective way to deep compare a complex object.
  return (
    JSON.stringify(prevProps.formData) === JSON.stringify(nextProps.formData)
  );
}

export default React.memo(PdfPreview, areEqual);
