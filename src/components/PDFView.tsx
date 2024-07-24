import { useState } from "react";
import { Document, Page ,pdfjs} from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewProps {
  pdfLink: string;
}

const PDFView: React.FC<PDFViewProps> = ({ pdfLink }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

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
