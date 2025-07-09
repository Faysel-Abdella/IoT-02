import { useSelector } from "react-redux";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./pdfDocument";

const PdfPreviewer = () => {
  const formData = useSelector((state) => state.form);

  if (!formData) {
    return <div>Loading Preview...</div>;
  }

  // The style tells the viewer to take up 100% of the space
  // provided by its parent (.previewSection in this case).
  return (
    <div>
      <PDFViewer
        style={{
          position: "relative",
          width: "100%",
          height: "650px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          display: "flex",
        }}
      >
        <PdfDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

export default PdfPreviewer;
