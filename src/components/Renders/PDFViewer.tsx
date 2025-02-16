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
    </div>
  );
};

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const [rotation, setRotation] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [navMode, setNavMode] = useState<"infinite" | "paginated">("infinite");
  // In paginated mode, pageNum is used; in infinite mode, currentPage is determined by scroll.
  const [pageNum, setPageNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // Setup IntersectionObserver for infinite scroll mode to detect current page.
  useEffect(() => {
    if (navMode !== "infinite" || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visiblePage = currentPage;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const id = entry.target.id; // expected to be "page-X"
            const match = id.match(/page-(\d+)/);
            if (match) {
              visiblePage = parseInt(match[1]);
            }
          }
        });
        setCurrentPage(visiblePage);
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const pageElements = container.querySelectorAll("[id^='page-']");
    pageElements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, [navMode, pdf, currentPage]);

  // Rotation Controls
  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);

  // Toggle bookmark for current page based on nav mode.
  const toggleBookmark = (page: number) => {
    if (bookmarks.includes(page)) {
      setBookmarks((prev) => prev.filter((num) => num !== page));
    } else {
      setBookmarks((prev) => [...prev, page]);
    }
  };

  // Toggle navigation mode
  const toggleNavMode = () => {
    setNavMode((prev) => (prev === "infinite" ? "paginated" : "infinite"));
  };

  return (
    <div className="p-4">
      {/* Navigation Mode Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleNavMode}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          {navMode === "infinite"
            ? "Switch to Paginated Mode"
            : "Switch to Infinite Scroll"}
        </button>
      </div>

      {/* Bookmarks Bar */}
      {bookmarks.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {bookmarks
            .sort((a, b) => a - b)
            .map((bm) => (
              <button
                key={bm}
                onClick={() =>
                  navMode === "infinite" ? scrollToPage(bm) : setPageNum(bm)
                }
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
        {pdf && (
          <button
            onClick={() =>
              navMode === "infinite"
                ? toggleBookmark(currentPage)
                : toggleBookmark(pageNum)
            }
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
          >
            <FontAwesomeIcon
              icon={
                navMode === "infinite"
                  ? bookmarks.includes(currentPage)
                    ? solidBookmark
                    : regularBookmark
                  : bookmarks.includes(pageNum)
                  ? solidBookmark
                  : regularBookmark
              }
              size="lg"
            />
            <span className="ml-1">
              Bookmark {navMode === "infinite" ? currentPage : pageNum}
            </span>
          </button>
        )}
      </div>

      {/* Viewer Container */}
      {navMode === "infinite" ? (
        <div
          id="scrollContainer"
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
      ) : (
        // Paginated mode: render only the current page
        <div className="flex flex-col items-center">
          {pdf ? (
            <PageRenderer
              pdf={pdf}
              pageNumber={pageNum}
              scale={scale}
              rotation={rotation}
            />
          ) : (
            <p className="text-center text-gray-800">Loading PDF...</p>
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={pageNum === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-800">{`Page ${pageNum} of ${
              pdf?.numPages || 0
            }`}</span>
            <button
              onClick={() =>
                setPageNum((prev) =>
                  pdf ? Math.min(prev + 1, pdf.numPages) : prev
                )
              }
              disabled={!pdf || pageNum === pdf.numPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to scroll to a specific page in infinite mode.
const scrollToPage = (page: number) => {
  const element = document.getElementById(`page-${page}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default PDFViewer;
