import { useEffect, useRef } from "react";
import { PageRendererProps } from "./PDFViewer";

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

      // Inherent rotation and effective rotation handling.
      const inherentRotation = page.rotate || 0;
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
      className="w-full md:w-[70%] mx-auto my-4 last:mb-0 border shadow-md rounded-lg overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full dark:filter dark:invert dark:brightness-110"
      />
    </div>
  );
};

export default PageRenderer;
