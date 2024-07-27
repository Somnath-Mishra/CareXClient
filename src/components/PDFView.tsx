
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewProps {
  pdfLink: string;
}

const PDFView: React.FC<PDFViewProps> = ({ pdfLink }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const pageNumber = 1; // Current page number

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto bg-white shadow-lg rounded-lg">
      <Document
        file={pdfLink}
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative w-full h-[600px] overflow-auto border border-gray-300 rounded-lg"
      >
        <Page pageNumber={pageNumber} className="w-full h-full" />
      </Document>
      <div className="mt-4 flex items-center justify-between text-gray-700">
        <p className="text-sm">
          Page {pageNumber} of {numPages || "..."}
        </p>
        {/* Optional navigation controls */}
        {/* <div>
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Previous
          </button>
          <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PDFView;
