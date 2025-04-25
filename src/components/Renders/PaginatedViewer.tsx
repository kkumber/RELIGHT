import React from "react";
import PageRenderer from "./PageRender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDocumentProxy } from "pdfjs-dist";

interface PaginatedViewerProps {
  pdf: PDFDocumentProxy;
  scale: number;
  rotation: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const PaginatedViewer: React.FC<PaginatedViewerProps> = ({
  pdf,
  scale,
  rotation,
  pageNum,
  setPageNum,
}) => (
  <div className="flex flex-col items-center h-full justify-center">
    <PageRenderer
      pdf={pdf}
      pageNumber={pageNum}
      scale={scale}
      rotation={rotation}
    />
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => setPageNum((p) => Math.max(p - 1, 1))}
        disabled={pageNum === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className="text-gray-800">{`Page ${pageNum} of ${pdf.numPages}`}</span>
      <button
        onClick={() => setPageNum((p) => Math.min(p + 1, pdf.numPages))}
        disabled={pageNum === pdf.numPages}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  </div>
);

export default PaginatedViewer;
