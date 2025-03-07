import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"; // Worker import

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await fetch(pdfUrl, { mode: "cors" }); // Enable CORS if needed
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob); // Create a Blob URL for the PDF file
        const loadingTask = pdfjs.getDocument(blobUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPage = async () => {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas!.getContext("2d");
      canvas!.width = viewport.width;
      canvas!.height = viewport.height;
      await page.render({ canvasContext: context!, viewport }).promise;
    };

    renderPage();
  }, [pdf, pageNum]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="rounded-lg shadow-lg" />
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
          disabled={pageNum === 1}
        >
          Previous
        </button>
        <span className="text-white">{`Page ${pageNum} of ${
          pdf?.numPages || 0
        }`}</span>
        <button
          onClick={() =>
            setPageNum((prev) =>
              pdf ? Math.min(prev + 1, pdf.numPages) : prev
            )
          }
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
          disabled={!pdf || pageNum === pdf.numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
