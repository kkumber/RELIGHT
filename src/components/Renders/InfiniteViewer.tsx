import React, { useCallback, useRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import PageRenderer from "./PageRender";
import { PDFDocumentProxy } from "pdfjs-dist";

const GAP = 8;
const BUFFER_PAGES = 5;

interface InfiniteViewerProps {
  pdf: PDFDocumentProxy;
  scale: number;
  rotation: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const InfiniteViewer: React.FC<InfiniteViewerProps> = ({
  pdf,
  scale,
  rotation,
  currentPage,
  setCurrentPage,
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<any>(null);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const pageNumber = index + 1;
      const top = (style.top as number) + GAP * index;
      const height = (style.height as number) - GAP;
      useEffect(() => {
        const el = document.getElementById(`page-${pageNumber}`);
        if (!el) return;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setCurrentPage(pageNumber);
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.unobserve(el);
      }, [pageNumber]);

      return (
        <div
          id={`page-${pageNumber}`}
          style={{ top, height, display: "flex", justifyContent: "center" }}
          className="absolute w-full"
        >
          <PageRenderer
            pdf={pdf}
            pageNumber={pageNumber}
            scale={scale}
            rotation={rotation}
          />
        </div>
      );
    },
    [pdf, scale, rotation, setCurrentPage]
  );

  // Removed the auto-scroll effect to allow manual scrolling only

  const containerHeight = viewerRef.current?.clientHeight || window.innerHeight;
  const itemHeight = containerHeight + GAP;

  return (
    <div ref={viewerRef} className="overflow-auto h-screen relative">
      <List
        height={containerHeight}
        itemCount={pdf.numPages}
        itemSize={itemHeight}
        width="100%"
        ref={listRef}
        overscanCount={BUFFER_PAGES}
      >
        {Row}
      </List>
    </div>
  );
};

export default InfiniteViewer;
