// PDFViewer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import ViewerControls from "./ViewerControls";
import InfiniteViewer from "./InfiniteViewer";
import PaginatedViewer from "./PaginatedViewer";
import scrollToPage from "../../utils/scrollToPage";
import { useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [navMode, setNavMode] = useState<string>(
    JSON.parse(localStorage.getItem("navMode")!) || "paginated"
  );
  const [pageNum, setPageNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const viewerRef = useRef<HTMLDivElement>(null);
  const controlTimeoutRef = useRef<number>();
  const { slug } = useParams();

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await fetch(pdfUrl, { mode: "cors" });
        if (!response.ok) throw new Error("Failed to load PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const task = pdfjs.getDocument({ url: blobUrl, rangeChunkSize: 65536 });
        const loadedPdf = await task.promise;
        setPdf(loadedPdf);
      } catch (error) {
        console.error(error);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  // Persist navMode
  useEffect(() => {
    localStorage.setItem("navMode", JSON.stringify(navMode));
  }, [navMode]);

  // Auto-scale logic
  useEffect(() => {
    if (!pdf || !viewerRef.current) return;
    const computeScale = async () => {
      const width = viewerRef.current!.clientWidth;
      const height = viewerRef.current!.clientHeight;
      const page = await pdf.getPage(1);
      const vp = page.getViewport({ scale: 1, rotation });
      const wScale = width / vp.width;
      const hScale = height / vp.height;
      setScale(Math.min(wScale, hScale) * 1.6);
    };
    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, [pdf, rotation]);

  const handleRotateLeft = () => setRotation((r) => (r - 90) % 360);
  const handleRotateRight = () => setRotation((r) => (r + 90) % 360);
  const toggleNavMode = () =>
    setNavMode((m) => (m === "infinite" ? "paginated" : "infinite"));
  const handleViewerClick = () => {
    setShowControls(true);
    window.clearTimeout(controlTimeoutRef.current);
    controlTimeoutRef.current = window.setTimeout(
      () => setShowControls(false),
      5000
    );
  };

  if (!pdf) return <p className="text-center">Loading PDF...</p>;

  return (
    <div
      ref={viewerRef}
      className="relative h-screen w-full"
      onClick={handleViewerClick}
    >
      <ViewerControls
        show={showControls}
        toggleNavMode={toggleNavMode}
        rotateLeft={handleRotateLeft}
        rotateRight={handleRotateRight}
        pageNum={pageNum}
        currentPage={currentPage}
        navMode={navMode}
        scrollToPage={scrollToPage}
        setPageNum={setPageNum}
        slug={slug}
      />
      {navMode === "infinite" ? (
        <InfiniteViewer
          pdf={pdf}
          scale={scale}
          rotation={rotation}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <PaginatedViewer
          pdf={pdf}
          scale={scale}
          rotation={rotation}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      )}
    </div>
  );
};

export default PDFViewer;
