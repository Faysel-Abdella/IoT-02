import React, { useState, useEffect } from "react"; // <-- Step 1: Import useState and useEffect
import { useSelector } from "react-redux";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument";

const PdfPreviewer = () => {
  // Step 2: Get the REAL, live data from Redux. This will change on every keystroke.
  const liveFormData = useSelector((state) => state.form);

  // Step 3: Create a new state to hold the "stable" data that we'll pass to the PDF.
  // We initialize it with the first data we get from Redux.
  const [stablePdfData, setStablePdfData] = useState(liveFormData);

  // Step 4: This is the debouncing magic.
  useEffect(() => {
    // When liveFormData changes, we set a timer.
    const handler = setTimeout(() => {
      // After 500ms of no new changes, we update the stable data.
      // This is what will trigger the PDF to re-render, but only once.
      setStablePdfData(liveFormData);
    }, 500); // 500ms is a good starting point. You can adjust this value.

    // This is the cleanup function. If the user types again before 500ms is up,
    // we clear the old timer and the effect runs again, setting a new timer.
    return () => {
      clearTimeout(handler);
    };
  }, [liveFormData]); // This effect depends on the live data from Redux.

  // The loading check is still a good idea.
  if (!stablePdfData) {
    return <div>Loading Preview...</div>;
  }

  return (
    <div>
      <PDFViewer
        style={{
          // Your styles are perfect and remain unchanged.
          position: "relative",
          width: "100%",
          height: "650px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          display: "flex",
        }}
      >
        {/* Step 5: Pass the STABLE, debounced data to the PDF document. */}
        {/* This component will now only re-render when the user pauses. */}
        <PdfDocument formData={stablePdfData} />
      </PDFViewer>
    </div>
  );
};

export default PdfPreviewer;
