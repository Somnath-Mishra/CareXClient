import { useState } from "react";
import { Document, Page } from "react-pdf";

interface PDFViewProps {
  pdfLink: string;
}

const PDFView: React.FC<PDFViewProps> = ({ pdfLink }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  // const [pageNumber, setPageNumber] = useState<number>(1);

  const pageNumber = 1;
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages || "..."}
      </p>
    </div>
  );
};

export default PDFView;
