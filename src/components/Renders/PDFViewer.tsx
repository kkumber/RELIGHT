import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faRotateRight,
  faExchangeAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Bookmark from "../UI/Bookmark";

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

      // Get the inherent rotation from the PDF page (if any)
      const inherentRotation = page.rotate || 0;

      // If the inherent rotation is 180°, we assume that means the page is stored upside down.
      // In that case, we ignore the inherent rotation so that user-controlled rotation is used directly.
      // Otherwise, we add the inherent rotation.
      const effectiveRotation =
        inherentRotation === 180
          ? rotation
          : (rotation + inherentRotation) % 360;

      const viewport = page.getViewport({ scale, rotation: effectiveRotation });
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
      className="w-[70%] mx-auto my-4 last:mb-0 border shadow-md rounded-lg overflow-hidden"
    >
      {/* For dark mode */}
      <canvas
        ref={canvasRef}
        className="w-full dark:filter dark:invert dark:brightness-110"
      />
    </div>
  );
};

/////////////////////////////////////////////////////////
//                   MAIN COMPONENT
/////////////////////////////////////////////////////////

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState<number>(1.5);
  const [rotation, setRotation] = useState<number>(0);
  const [navMode, setNavMode] = useState<"infinite" | "paginated">("paginated");
  const [pageNum, setPageNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { slug } = useParams();

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

  // Setup IntersectionObserver for infinite scroll mode to detect the visible page.
  useEffect(() => {
    if (navMode !== "infinite" || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Use multiple thresholds to get more granular updates.
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visiblePage = 0;
        entries.forEach((entry) => {
          const match = entry.target.id.match(/page-(\d+)/);
          if (match) {
            const pageNumber = parseInt(match[1]);
            if (entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              visiblePage = pageNumber;
            }
          }
        });
        if (visiblePage > 0 && visiblePage !== currentPage) {
          setCurrentPage(visiblePage);
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const observePages = () => {
      const pageElements = container.querySelectorAll("[id^='page-']");
      pageElements.forEach((el) => observer.observe(el));
    };
    observePages();

    return () => {
      observer.disconnect();
    };
  }, [navMode, pdf, pdf?.numPages]);

  // Rotation controls
  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);

  // Toggle navigation mode
  const toggleNavMode = () => {
    setNavMode((prev) => (prev === "infinite" ? "paginated" : "infinite"));
  };

  return (
    <div className="p-2 md:p-4 relative">
      {showControls && (
        <div className="mb-4 fixed z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Navigation Mode Toggle */}
            <button
              onClick={toggleNavMode}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              <FontAwesomeIcon icon={faExchangeAlt} size="sm" />
            </button>

            {/* Rotate Left */}
            <button
              onClick={handleRotateLeft}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              <FontAwesomeIcon icon={faRotateLeft} size="sm" />
            </button>

            {/* Rotate Right */}
            <button
              onClick={handleRotateRight}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              <FontAwesomeIcon icon={faRotateRight} size="sm" />
            </button>

            {/* Bookmark Toggle with Number */}
            <Bookmark
              slug={slug}
              pageNum={pageNum}
              currentPage={currentPage}
              navMode={navMode}
              scrollToPage={scrollToPage}
              setPageNum={setPageNum}
            />
          </div>
        </div>
      )}

      {/* Viewer Container */}
      {navMode === "infinite" ? (
        <div
          id="scrollContainer"
          ref={scrollContainerRef}
          className="overflow-auto h-screen"
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
          <div className="flex flex-row items-center gap-4 mt-4">
            <button
              onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={pageNum === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
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
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
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
