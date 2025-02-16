import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PageRendererProps {
  pdf: pdfjs.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  rotation: number;
}

const PageRenderer: React.FC<PageRendererProps> = ({
  pdf,
  pageNumber,
  scale,
  rotation,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderPage = async () => {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale, rotation });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      context?.clearRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: context!, viewport }).promise;
      // Remove search highlighting for simplicity.
    };

    renderPage();
  }, [pdf, pageNumber, scale, rotation]);

  return (
    <div
      id={`page-${pageNumber}`}
      className="w-full max-w-md mx-auto my-4 border shadow-md rounded-lg overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full dark:filter dark:invert dark:brightness-110"
      />
      {/* You could include a second canvas for highlights if needed */}
      <canvas
        ref={highlightCanvasRef}
        className="absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
};

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const [rotation, setRotation] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await fetch(pdfUrl, { mode: "cors" });
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const loadingTask = pdfjs.getDocument(blobUrl);
        const loadedPdf = await loadingTask.promise;
        setPdf(loadedPdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  // Rotation Controls
  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);

  // Toggle bookmark for current page (we bookmark the current page number)
  const toggleBookmark = (page: number) => {
    if (bookmarks.includes(page)) {
      setBookmarks((prev) => prev.filter((num) => num !== page));
    } else {
      setBookmarks((prev) => [...prev, page]);
    }
  };

  // Scroll to a given page by its container id
  const scrollToPage = (page: number) => {
    const element = document.getElementById(`page-${page}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="p-4">
      {/* Bookmarks Bar at the Top */}
      {bookmarks.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {bookmarks
            .sort((a, b) => a - b)
            .map((bm) => (
              <button
                key={bm}
                onClick={() => scrollToPage(bm)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md flex items-center gap-1"
              >
                <FontAwesomeIcon icon={solidBookmark} size="sm" />
                <span>{bm}</span>
              </button>
            ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <button
          onClick={handleRotateLeft}
          className="px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Rotate Left
        </button>
        <button
          onClick={handleRotateRight}
          className="px-4 py-2 bg-gray-800 text-white rounded-md"
        >
          Rotate Right
        </button>
        {/* Toggle bookmark for current page */}
        {pdf && (
          <button
            onClick={() => toggleBookmark(1)} // For infinite scrolling, you might have a "Bookmark" per page.
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            <FontAwesomeIcon
              icon={bookmarks.includes(1) ? solidBookmark : regularBookmark}
              size="lg"
            />
            <span className="ml-1">Bookmark Current</span>
          </button>
        )}
      </div>

      {/* Viewer Container with Infinite Scrolling */}
      <div
        ref={scrollContainerRef}
        className="overflow-auto"
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {pdf ? (
          Array.from({ length: pdf.numPages }, (_, i) => (
            <PageRenderer
              key={i + 1}
              pdf={pdf}
              pageNumber={i + 1}
              scale={scale}
              rotation={rotation}
            />
          ))
        ) : (
          <p className="text-center text-gray-800">Loading PDF...</p>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
